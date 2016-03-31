Here are my thoughts on integrating L20n with React.

I spent some time learning React (and other popular frameworks), went 
through a few tutorials and wrote some code.  One of the most helpful 
experience was the meet.js Summit conference which I attended two weeks 
ago where I spoke to many people about this and got a first round of 
feedback.

I would now like to write down these thoughts and conclusions from 
conversations in a structured manner and open them up to a larger 
discussion.  I'd love to get more feedback on these ideas.  Please 
don't be shy to chime in especially if you've already written a few 
React apps.  And thanks in advance for your patience—this is a long 
email.


How L20n works
==============

First, a brief reminder of how L20n currently works.

The developer puts the information about the available languages and 
links to resources in <head>.  As soon as it's ready, L20n starts the 
language negotiation process using this information and subsequently 
starts downloading the relevant resources in the user's most prefered 
language.  Translations are only available via an async API.

DOM nodes with localizable messages are marked up with data-l10n-id 
attributes.  These attibutes are observed by L20n's mutation observer:  
each time a new node with the attribute is inserted or the attribute 
changes, L20n will retranslate the node in question.

Translations can contain some HTML markup and importantly are objects: 
a single translation unit is responsible for localizing both the text 
value of a DOM node as well as its textual attributes.  Translations 
are parsed into an inert DocumentFragment and superimposed (or, 
overlayed) on the source node in the DOM.  Original child nodes in the 
source DOM are kept in the translated result; the identity doesn't 
change, event listeners are preserved.  Here's an example:

  source:

    <p data-l10n-id="foo"><button onclick="…"></button></p>

  translation:

    foo = <button>Send</button> your message <em>now</em>.

  result:

    <p data-l10n-id="foo">
      <button onclick="…">Send</button> your message <em>now</em>.
    </p>


How React works
===============

React structures the UI into components and the general consensus is 
that you should be smart about separting your components into stateful 
and stateless ones.  The former kind is for keeping the logic and the 
latter is for keeping the presentation layer.  Other than the state, 
you can pass so-called props to components to configure them (props can 
be textual data, child elements, callbacks, etc.).  Props are 
immutable.

React components have a well-defined lifecycle with self-explanatory 
method names like componentWillUpdate, render, componentDidMount and 
componentDidUpdate.  The render method is called to produce the virtual 
DOM representation of the component.  The virtual DOM operates on React 
components and not the actual DOM elements—the encapsulation is 
enforced during the reconciliation process up until the very last 
moment in which the actual rendering occurs.


How to integrate L20n into React
================================

There are multiple ways we could integrate L20n into React.  Some seem 
to be more idiomatic for React, while others enforce a stricter 
separation of concerns and let L20n do its thing independently of 
React.

In the following examples I'll be using variations of the following 
React code:

  http://stasm.github.io/l20n-react-experiments/base/


1. L20n Components
------------------

Since React uses components, an obviousl first try is to provide a set 
of special-purpose components whose job is to display translated 
messages.

    render() {
      return (
        <h1>
          <Translation id="hello" name={this.props.name}/>
        </h1>
      );
    }

This allows us to seamlessly take advantage of the "component" metaphor 
and pass developer-provided arguments as props/attributes and even put 
children inside of the <Translation/>!

There is, however, a problem with this approach.  Components need to be 
enclosed in an outer HTML element, e.g. a <span>, which would result in 
needless nesting of redundant elements.  One possible solution would be 
to do something like this instead:

    render() {
      return (
        <TranslatedElement elem="h1" id="hello" name=… />
      );
    }

(This is in fact what Yahoo's react-intl does.  It also sometimes wraps 
translation components in <span>.)

Or even:

    render() {
      return (
        <TranslatedH1 id="hello" name=… />
      );
    }

An implementation of this approach (without overlays) lives at:

  http://stasm.github.io/l20n-react-experiments/components/

This approach extends quite well to attributes because we'd encapsulate 
the logic of translating the <h1> together with the attributes inside 
of the <TranslatedH1> component.  For the same reason it would be 
possible to pass children into the component.  This way one could 
define the source (default) text which could then be extracted into 
a localization resource by tools.  It would also be possible to define 
interactive elements as children and run the (virtual) DOM overlay 
logic:

    render() {
      return (
        <TranslatedP id="hello" name=…>
          <button onClick=…></button>
        </TranslatedP>
      );
    }

Each instance of the <Translated*> components could store the contents 
of the translations or the storage could be centralized via a React's 
context (see 2.C. below).


2. Translation passed as props and/or children
----------------------------------------------

Another React's idiom is to use variables stored in the state and 
expand them into element's attributes or contents.  It can be the 
current's component's state, or it can be stored in a high order 
component which transparently wraps around another one, or it could be 
a global store passed in as a context to all child components.

    render() {
      return <p title={…}> {…} </p>;
    }

What goes into the {…} depends on the exact solution.  It could be 
this.state.translations.title or this.props.getTranslation('title') or 
this.context.getTranslation('title').  My preference goes to functions 
because then we can pass this.state as l10-args.

The challenge with this approach is that we need a way to get the list 
of translations that we'll use to populate the state.  Keep in mind 
that the L20n API is async.  In order to make a sync request inside of 
the {…} we need to first prepare the data store accordinly.  There are 
a few possible solutions here.

  A. Save translation ids as they're being requested.

     In this scenario we're collecting the translation ids requested 
during the first render of the component.  When the render is complete 
and the componented is mounted, we retrieve the translations 
asynchronously and save the result to the component's state this 
triggering a re-render.

An implementation of this approach (without overlays) lives at:

  http://stasm.github.io/l20n-react-experiments/mutable-state/


  B. Declare which ids will be needed to render the component.

     Here we're declaring which translation ids will be needed.  This 
can be done with a property stored on the component or by using 
data-l10n-ids in the render() method.  Declaring args this way is hard.

Two implementations (one for a property and another one for 
data-l10n-id)  of this approach (without overlays) live at:

  http://stasm.github.io/l20n-react-experiments/declarative-property/
  http://stasm.github.io/l20n-react-experiments/declarative-state/


  C. Use a global store à la Redux Provider. 

     Lastly, we can use React's contexts to create a state store which 
is globally available to all child components.

    ReactDOM.render(
      <TranslationProvider src="/path/to/{locale}/resource">
        <App />
      </TranslationProvider>,
      document.getElementById("container")
    );

An implementation of this approach (without overlays) lives at:

  http://stasm.github.io/l20n-react-experiments/context/


* * *

Reading more about the context made me realize that even if we can 
store the state (translations) in individual components (like in A. and 
B.), we still probably want a central place to store the current 
language chosen by or negotiated on the user's behalf.  In fact, all of 
the above solutions would likely benefit from a central translation 
store or "provider". I implemented an example at:

  http://stasm.github.io/l20n-react-experiments/components-context/


3. Virtual DOM manipulation
---------------------------

In this scenario we could make L20n hook into the render() method of 
components which need to be localized.  The method returns 
a React.Component instance which has props for attributes and 
props.children for, well, child elements.  We could traverse this 
virtual DOM similar to how we do it with the regular DOM in L20n's HTML 
bindings and apply translation logic where needed.  We could even 
re-implement the whole DOM overlay mechanism to operate on React's 
virtual DOM.

(No example implementation here yet!)


4. Real DOM manipulation via lifecycle methods
----------------------------------------------

What if we wanted to re-use more of the existing L20n code?  We could 
apply translations to the true DOM when React renders it.  Two 
lifecycle methods are perfect for this: componentDidMount() and 
componentDidUpdate().  I've been having some trouble getting the latter 
to work with High Order Components but I think the general idea is 
sound.

In this scenario we keep most of the current L20n intact and only use 
React as a mechanism to monitor changes to the DOM.  A mutation 
observer, really!  Indeed, in this approach we could remove L20n's 
internal mutation observer (if it's not needed by other pieces of the 
UI, like web components with Shadow DOM) and only rely on React to 
notify us about re-renders.

An implementation lives at:

  http://stasm.github.io/l20n-react-experiments/componentDidUpdate/


5. Real DOM manipulation via mutation observer
----------------------------------------------

Lastly, as it turns out, not changing anything in L20n is also a viable 
option for us to consider!  When a component with data-l10n-id is 
rendered or re-rendered, l20n's mutation observer picks up the change 
and translates the DOM node.  This means that L20n is completely 
separate from React.

An implementation lives at:

  http://stasm.github.io/l20n-react-experiments/mutation/



Conclusions
===========

The above examples are still WIP.  I'd like to better understand how 
changes to the state should be propagated to translations which need to 
be formatted anew and inserted into the DOM.
