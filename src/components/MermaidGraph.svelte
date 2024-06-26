<script lang="ts" context="module">
  import mermaid from "mermaid";

  let graphNum = 0;

  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    darkMode: false,
  });
</script>

<script lang="ts">
  import { HTMLElement, parse } from "node-html-parser";

  interface Props {
    code?: string;
    caption?: string;
  }

  let { code, caption }: Props = $props();
  let currentGraphNum = graphNum++;

  let svgOut = $state();
  svgOut = mermaid
    .render(`mermaid-graph-${currentGraphNum}`, code ?? "")
    .then(value => {
      const svg = value.svg;
      const root: HTMLElement = parse(svg);
      const child: HTMLElement = root.firstChild as HTMLElement;
      if (!child) return svg;

      child.setAttribute("style", "width:100%; height:auto");
      child.setAttribute("role", "img");
      child.removeAttribute("width");

      if (caption) {
        const captionID = `mermaid-graph-title-${currentGraphNum}`;
        child.setAttribute("aria-labelledby", captionID);
        child.appendChild(parse(`<title id="${captionID}">${caption}</title>`));
      }

      return root.toString();
    });
</script>

<figure class="my-8 flex flex-col items-center justify-center rounded-xl">
  <div class="h-full w-full border-2 border-skin-line p-6">
    {#await svgOut}
      <p>Loading...</p>
    {:then svg}
      {@html svg}
    {:catch error}
      <p class="font-bold">Something Went Wrong!</p>
      <p>{error}</p>
    {/await}
  </div>
  <figcaption style="text-align: center">{caption}</figcaption>
</figure>
