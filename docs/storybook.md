# Storybook

The storybook app allows developers to view and develop components in isolation. In addition to this it creates internal documentation on our component library. It does the majority of this automatically. All the developer needs to do is create a .stories.ts file and import their component.

## Running Storybook

To run the storybook app, use the command `npm run storybook`.

## Docs

https://storybook.js.org/

## Troubleshooting

If you are getting errors around context or routers, you might need to add the `withRouters` decorator.

```js
import { withRouter } from 'storybook-addon-react-router-v6';
const meta = {
    // ...rest of meta
    decorators: [withRouter],
}
```

After making changes to .stories files, it is usually required to re-run `npm run storybook`. This shouldn't be required when making changes to the component files, but it is worth a try if changes are not updating.
