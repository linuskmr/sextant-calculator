<script lang="ts">
    import {Sextant} from "./lib/sextant";
    import {Angle} from "./lib/angle";
    import Footer from "./Footer.svelte";

    let timezoneStr = "0"
    $: timezone = Number.parseFloat(timezoneStr)

    let angleStr = "42° 11' 10\""
    $: angle = Angle.from_str(angleStr)

    let dateStr = new Date().toISOString().substring(0, 10) // https://stackoverflow.com/a/14246394
    let timeStr = "12:00"

    let datetime: Date = new Date()
    $: {
        console.log(dateStr)
        // Date
        const [yearStr, monthStr, dayStr] = dateStr.split('-')
        const year = Number.parseInt(yearStr)
        const month = Number.parseInt(monthStr) + 1 // January in Javascript is month 0
        const day = Number.parseInt(dayStr)
        datetime.setFullYear(year, month, day)

        // Time
        const [hoursStr, minutesStr] = timeStr.split(':')
        const hours = Number.parseInt(hoursStr) + timezone
        const hoursUTC = hours + timezone
        const minutes = Number.parseInt(minutesStr)
        datetime.setHours(hoursUTC, minutes)

        datetime = datetime // Needed for Svelte to recognize that this value changed
    }

    $: sextant = new Sextant(datetime, angle, Angle.zero, Angle.zero)

</script>

<main>
    <h1>Sextant Calculator</h1>

    <label for="timezone">Your timezone</label>
    <select id="timezone" bind:value={timezoneStr}>
        <option value="-12">UTC-12</option>
        <option value="-11">UTC-11</option>
        <option value="-10">UTC-10</option>
        <option value="-9">UTC-9</option>
        <option value="-8">UTC-8</option>
        <option value="-7">UTC-7</option>
        <option value="-6">UTC-6</option>
        <option value="-5">UTC-5</option>
        <option value="-4">UTC-4</option>
        <option value="-3">UTC-3</option>
        <option value="-2">UTC-2</option>
        <option value="-1">UTC-1</option>
        <option value="0">UTC • Coordinated Universal Time</option>
        <option value="+1">UTC+1 • Central European Time</option>
        <option value="+2">UTC+2 • Central European Summer Time</option>
        <option value="+3">UTC+3</option>
        <option value="+4">UTC+4</option>
        <option value="+5">UTC+5</option>
        <option value="+6">UTC+6</option>
        <option value="+7">UTC+7</option>
        <option value="+8">UTC+8</option>
        <option value="+9">UTC+9</option>
        <option value="+10">UTC+10</option>
        <option value="+11">UTC+11</option>
        <option value="+12">UTC+12</option>
    </select>

    <section>
        <label for="date">Measuring Date</label>
        <input id="date" type="date" bind:value={dateStr}>
    </section>

    <section>
        <label for="time">Time of sun peak</label>
        <input id="time" type="time" bind:value={timeStr}>

        <label for="angle">Measured angle at sun peak</label>
        <input id="angle" type="text" bind:value={angleStr}>
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