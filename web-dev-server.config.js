export default {
  plugins: [
    {
      // When we're using web-dev-server's --watch mode, we don't want our
      // sample HTML files to get the injected web socket reload script tag.
      // This plugin reverses that transformation just for those files. See
      // https://github.com/modernweb-dev/web/issues/761 for a feature request
      // to make this easier.
      name: 'remove-injected-watch-script',
      transform(ctx) {
        if (
          ctx.url.match(/^(\/configurator\/project\/|\/demo\/.+\/).*\.html$/)
        ) {
          return {
            body: ctx.body.replace(
              /<!-- injected by web-dev-server.*<\/script>/gs,
              ''
            ),
          };
        }
      },
    },
  ],
};
