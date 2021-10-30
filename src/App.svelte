<script lang="ts">

    import Measurements from "./Measurements.svelte";
    import Timezone from "./Timezone.svelte";
    import Date from "./Date.svelte";
    import Position from "./Position.svelte";
    import Footer from "./Footer.svelte";

    // $: sextant = new Sextant(new Date(), new Angle(measured_angle), Angle.zero, Angle.zero)

</script>

<main>
  <h1>Sextant Calculator</h1>

  <section>
    <Date/>
    <Timezone/>
  </section>

  <section>
    <Measurements/>
  </section>

  <section>
    <Position/>
  </section>

</main>

<Footer/>

<style>
    main {
        /* Causes the footer to appear only when scrolling down, because main always takes up at least one full page */
        min-height: 100vh;
    }

    section {
        padding-bottom: 30px;
    }
</style>