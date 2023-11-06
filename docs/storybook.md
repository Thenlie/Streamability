# Storybook 📚

The storybook app allows developers to view and develop components in isolation. In addition to this it creates internal documentation on our component library. It does the majority of this automatically. All the developer needs to do is create a .stories.ts file and import their component.

## Running Storybook 📖

To run the storybook app, use the command `npm run storybook`.

## Docs

[https://storybook.js.org/](https://storybook.js.org/)

## Creating stories 📝

If you are creating a new component, you should also be creating a new story! Don't worry, they are very simple to create.

The easiest way to create a new story is to simply copy an existing story into a new file.

```sh
cp src/stories/components/ShowCard.stories.ts > src/stories/components/NewComponent.stories.ts
```

From there, you can replace all instances of `ShowCard` with your new component. Be sure to also update the name of the story as well. The location also might need to be updated as loaders and modals have their own directories.

This should get you 99% of the way there. Any other tweaks will be up to you!

You can read more about creating stories in the [Official Documentation](https://storybook.js.org/docs/react/writing-stories/introduction).

## Troubleshooting 🛠️

If you are getting errors around context or routers, you might need to add the `withRouters` decorator.

```js
import { withRouter } from 'storybook-addon-react-router-v6';
const meta = {
    // ...rest of meta
    decorators: [withRouter],
}
```

After making changes to .stories files, it is usually required to re-run `npm run storybook`. This shouldn't be required when making changes to the component files, but it is worth a try if changes are not updating.
