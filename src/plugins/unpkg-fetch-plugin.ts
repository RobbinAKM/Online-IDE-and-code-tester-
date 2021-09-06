import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

var store = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (codeInput: string) => {
  return {
    name: "unpkg-fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: codeInput,
          };
        }

        const cachedItem = await store.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedItem) {
          return cachedItem;
        }
        const { data, request } = await axios.get(args.path);

        console.log(request.responseURL);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '//"')
          .replace(/'/g, "//'");

        const filetype = args.path.match(/.css$/) ? "css" : "jsx";
        const contents =
          filetype === "css"
            ? `var style= document.createElement('style')
        style.innerText= '${escaped}'
        document.head.appendChild(style)`
            : data;

        const result: esbuild.OnLoadResult = {
          resolveDir: new URL("./", request.responseURL).pathname,
          loader: "jsx",
          contents,
        };
        await store.setItem(args.path, result);
        return result;
      });
    },
  };
};
