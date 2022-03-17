<script lang="ts">
    import {Sextant} from "./lib/sextant";
    import {Angle} from "./lib/angle";
    import Footer from "./Footer.svelte";

    let timezoneStr = "0"
    $: timezone = Number.parseFloat(timezoneStr)

    let angleDegrees = 42
    let angleMinutes = 10
    let angleSeconds = 37
    $: angle = Angle.from_deg_min_sec(angleDegrees, angleMinutes, angleSeconds)

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

    <section>
        <label for="date">Measuring Date</label>
        <input id="date" type="date" bind:value={dateStr}>

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
            <option value="0">UTC/GMT</option>
            <option value="+1">UTC+1</option>
            <option value="+2">UTC+2</option>
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

        <label for="time">Time of sun peak</label>
        <input id="time" type="time" bind:value={timeStr}>
    </section>

    <section>


        <div style="display: inline;">
            <label for="angle_degrees">Measured angle at sun peak</label>
            <input class="degree" id="angle_degrees" type="number" bind:value={angleDegrees}>°
            <input class="degree" id="angle_minutes" type="number" bind:value={angleMinutes}>'
            <input class="degree" id="angle_seconds" type="number" bind:value={angleSeconds}>"
        </div>
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
        font-size: inherit;
    }

    section {
        padding-bottom: 15px;
    }

    .degree {
        width: 100px;
    }
</style>