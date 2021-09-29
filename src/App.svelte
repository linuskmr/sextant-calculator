<script lang="ts">
    import {Sextant} from "./lib/sextant";
    import {Angle} from "./lib/Angle";
    import Footer from "./Footer.svelte";

    let measured_angle = 42
    let date = new Date().toISOString().substring(0, 10) // https://stackoverflow.com/a/14246394
    $: sextant = new Sextant(new Date(), new Angle(measured_angle), Angle.zero, Angle.zero)

</script>

<main>
    <h1>Sextant Calculator</h1>

    <section>
        <label>
            Measuring Date
            <br>
            <input type="date" bind:value={date}>
        </label>
    </section>

    <section>
        <label>
            Measured Angle
            <br>
            <input type="number" bind:value={measured_angle}>
        </label>
    </section>

    <section>
        <span>Position</span>
        <pre style="width: max-content">{sextant.position}</pre>

        <a href="https://www.google.de/maps/place/{sextant.position.latitude},{sextant.position.longitude}">
            Open position on Google Maps
        </a>
    </section>
</main>

<Footer/>

<style>
    pre {
        background-color: #30363c;
        padding: 10px;
        border-radius: 5px;
    }

    main {
        /* Causes the footer to appear only when scrolling down, since main always takes up at least one full page */
        min-height: 100vh;
    }

    section {
        padding-bottom: 15px;
    }
</style>