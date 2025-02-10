# Copilot.js

Copilot.js is a frontend toolkit to build **product copilots**. It lets you create a custom AI assistant inside your product, with minimal effort. The copilot works like a supercharged Siri, converting user prompts into product actions.

![Hero](http://www.copilotjs.com/docs/hero.gif)

## Demo

[Try the live demo.](https://www.copilotjs.com/demo)

## Documentation

[Read the docs.](https://www.copilotjs.com/docs)

## Quickstart

1. [Sign up](https://www.copilotjs.com/signup) for a Copilot.js account, and copy your `Copilot ID` from the dashboard.
2. [Download](https://github.com/get-copilot/copilot.js/archive/refs/heads/main.zip) the `<Copilot>` component.
3. Unzip and copy the folder `ui-components/Copilot` into your project (eg, to `src/components`).
4. Install the dependencies:

   ```bash
   npm i @copilotjs/react @heroicons/react clsx react-markdown react-textarea-autosize remark-gfm
   npm i -D @tailwindcss/typography @tailwindcss/forms
   ```

5. Edit your CSS file to use the `typography` and `forms` plugins:

   ```css
   /* CSS */
   @import "tailwindcss";
   @plugin "@tailwindcss/typography";
   @plugin "@tailwindcss/forms";
   /* ... */
   ```

6. Use `<CopilotProvider>` and `<Copilot>` in your project:

   ```jsx
   // Example.jsx
   import { CopilotProvider } from "@copilotjs/react";
   import { Copilot } from "@/components/Copilot"; // The folder where you placed Copilot.

   export default function Example() {
     return (
       <CopilotProvider
         copilotId="paste-your-copilot-id-here"
         userId="u"
         companyId="c"
       >
         <Copilot className="h-[600px] w-[400px]" />
       </CopilotProvider>
     );
   }
   ```

The result is:

![Copilot component](https://www.copilotjs.com/docs/copilot-component.gif)

## Next steps

- Customize the `<Copilot>` component. Since it was copied into your project, you fully control its appearance.
- Add [knowledge](https://www.copilotjs.com/docs/react/knowledge) to the Copilot.
- Add [actions](https://www.copilotjs.com/docs/react/actions) to the Copilot.
