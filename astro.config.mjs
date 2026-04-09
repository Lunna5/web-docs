// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { pluginLivePreview } from "./src/plugin/playground";
import starlightCatppuccin from "@catppuccin/starlight";
import starlightImageZoom from 'starlight-image-zoom'

// https://astro.build/config
export default defineConfig({
  site: "https://tic.lunna.dev",
  integrations: [
    starlight({
      title: "TIC",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/lunna/web-docs",
        },
      ],
      logo: {
        src: "./src/assets/logo.png",
        replacesTitle: true,
      },
      expressiveCode: {
        plugins: [pluginLivePreview()],
        styleOverrides: {
          textMarkers: {
            insBackground: "#10b98122",
          },
        },
      },
      sidebar: [
        {
          label: "Introducción",
          autogenerate: { directory: "introduccion" },
        },
				{
          label: "Tema 1: HTML",
          autogenerate: { directory: "html" },
        },
      ],
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "mocha"},
          light: { flavor: "latte" },
        }),
				starlightImageZoom(),
      ],
    }),
  ],
});
