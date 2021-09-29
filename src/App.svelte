<script lang="ts">
    import {Sextant} from "./lib/sextant";
    import {Angle} from "./lib/Angle";

    let name = "Linus"
    let measured_angle = 10

    let date = new Date().toISOString().substring(0, 10) // https://stackoverflow.com/a/14246394

    $: sextant = new Sextant(new Date(), new Angle(measured_angle), Angle.zero, Angle.zero)

</script>

<main>
    <h1>Sextant Calculator</h1>

    <label>
        Measuring Date
        <br>
        <input type="date" bind:value={date}>
    </label>

    <label>
        Measured Angle
        <br>
        <input type="number" bind:value={measured_angle}>
    </label>

    <span>Position</span>
    <pre style="width: max-content">{sextant.position}</pre>

    <a href="https://www.google.de/maps/place/{sextant.position.latitude},{sextant.position.longitude}">
        Open on Google Maps
    </a>
</main>

<footer>
    Abc
</footer>