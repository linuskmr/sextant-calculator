<script lang="ts">
    import {Sextant} from "../lib/sextant";
    import {Angle} from "../lib/angle";
    import Footer from "./Footer.svelte";
	import { sunDeclination as calculateSunDeclination, dayOfYear } from "$lib/sun_declination";

    let timezoneStr = "0" // Default to UTC/GMT timezone
    $: timezone = Number.parseFloat(timezoneStr)

    // Measured angle
    let angleDegrees = 23
    let angleMinutes = 29
    let angleSeconds = 37
    $: angle = Angle.from_deg_min_sec(angleDegrees, angleMinutes, angleSeconds)

    // Index error
	let indexErrorDegrees = 0
	let indexErrorMinutes = 0
	let indexErrorSeconds = 0
	$: indexError = Angle.from_deg_min_sec(indexErrorDegrees, indexErrorMinutes, indexErrorSeconds)

    // Measuring date and time
    let dateStr = new Date(Date.UTC(2022, /*February*/1, 7)).toISOString().substring(0, 10) // https://stackoverflow.com/a/14246394
    let timeStr = "11:34"

    // Parse measuring date and time to a Date object
    let datetime: Date = new Date()
    $: {
        console.log("Date string from input", dateStr)
        // Date
        const [yearStr, monthStr, dayStr] = dateStr.split('-')
        const year = Number.parseInt(yearStr)
        const month = Number.parseInt(monthStr) - 1 // January in Javascript is month 0
        const day = Number.parseInt(dayStr)
        datetime.setUTCFullYear(year, month, day)

        // Time
        const [hoursStr, minutesStr] = timeStr.split(':')
        const hours = Number.parseInt(hoursStr) - timezone
        const hoursUTC = hours + timezone
        const minutes = Number.parseInt(minutesStr)
        datetime.setUTCHours(hoursUTC, minutes)

        datetime = datetime // Needed for Svelte to recognize that this value changed
    }

    // Get the sun declination for the given date
    $: sunDeclination = calculateSunDeclination(dayOfYear(datetime))

    // Calculate the sextant position
    $: sextant = new Sextant(datetime, angle, sunDeclination, indexError)

</script>

<main>
    <h1>Sextant Calculator</h1>

    <section>
        <label for="date">Measuring Date</label>
        <input id="date" type="date" bind:value={dateStr}>

        <label for="timezone">Your Timezone</label>
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

        <label for="time">Time of Sun Peak</label>
        <input id="time" type="time" bind:value={timeStr}>
    </section>

    <section>


        <div style="display: inline;">
            <label for="angle_degrees">Measured Angle at Sun Peak</label>
            <input class="degree" id="angle_degrees" type="number" bind:value={angleDegrees}>°
            <input class="degree" id="angle_minutes" type="number" bind:value={angleMinutes}>'
            <input class="degree" id="angle_seconds" type="number" bind:value={angleSeconds}>"
        </div>

		<div style="display: inline;">
            <label for="angle_degrees">Index Error</label>
            <input class="degree" id="index_error_degrees" type="number" bind:value={indexErrorDegrees}>°
            <input class="degree" id="index_error_minutes" type="number" bind:value={indexErrorMinutes}>'
            <input class="degree" id="index_error_seconds" type="number" bind:value={indexErrorSeconds}>"
        </div>
    </section>

	<br><br>

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
    .degree {
        width: 100px;
    }
</style>