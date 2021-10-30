<script lang="ts">
  import {Sextant} from "./lib/sextant";
  import {Angle} from "./lib/angle";

  $: sextant = new Sextant(new Date(), new Angle(42), Angle.zero())
</script>

<span>Position</span>
<pre>{sextant.position}</pre>

<a href="https://www.google.de/maps/place/{sextant.position.latitude},{sextant.position.longitude}">
  Open position on Google Maps
</a>

<style>
    pre {
        background-color: var(--secondary-color);
        padding: 10px;
        border-radius: 5px;
        width: max-content;
    }
</style>