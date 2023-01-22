<script lang="ts">
  import { Sextant } from "../lib/sextant"
  import { Angle } from "../lib/angle"
  import {
    sunDeclination as calculateSunDeclination,
    dayOfYear,
  } from "$lib/sun_declination"
  import AngleInput from "./AngleInput.svelte"


  let timezoneStr = "+1"; // Default to CET timezone
  $: timezone = Number.parseFloat(timezoneStr)

  // Measured angle
  let measuredElevation = Angle.zero

  // Index error
  let indexError = Angle.zero

  // Measuring date and time
  let datetimeStr = "2022-02-12T12:32"

  // Parse measuring datetimeStr to Date object
  let datetime: Date = new Date()
  $: {
    datetime = new Date(datetimeStr)
    datetime.setHours(datetime.getHours() - timezone)
    datetime = datetime // Force reactivity
  }

  let culminationTimePrimeMeridianStr = "12:14";
  let culminationTimePrimeMeridian = new Date();

  $: {
    const [culminationPrimeMeridianHours, culminationPrimeMeridianMinutes] = culminationTimePrimeMeridianStr.split(":")
    culminationTimePrimeMeridian.setHours(Number.parseInt(culminationPrimeMeridianHours))
    culminationTimePrimeMeridian.setMinutes(Number.parseInt(culminationPrimeMeridianMinutes))
    culminationTimePrimeMeridian = culminationTimePrimeMeridian // Force reactivity
  }

  // Get the sun declination for the given date
  $: sunDeclination = calculateSunDeclination(dayOfYear(datetime))

  // Calculate the sextant position
  $: sextant = new Sextant(datetime, measuredElevation, sunDeclination, culminationTimePrimeMeridian, indexError)
</script>

<h1>Sextant Calculator</h1>

<h2>Inputs</h2>
<form>
  <fieldset>
      <legend>Time</legend>

      <label for="datetime">Date & Time of Measurement</label>
      <input type="datetime-local" id="datetime" bind:value={datetimeStr} />

      <label for="timezone">
        Timezone of Measurement<br>
        <small>Your timezone isn't included? Manually convert your local time to UTC time and choose 'UTC/GMT' as timezone.</small>
      </label>

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
          <option value="0">UTC (GMT)</option>
          <option value="+1">UTC+1 (CET)</option>
          <option value="+2">UTC+2 (CEST)</option>
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

      <label for="culmination_greenwich">
        Reference <a href="https://en.wikipedia.org/wiki/Culmination">Culmination</a> Time on <a href="https://en.wikipedia.org/wiki/Prime_meridian">Prime Meridian</a>, e.g. in Greenwich<br>
        <small>
          Calculation not yet implemented; Find it out yourself on <a href="https://www.suncalc.org/#/51.4779,0.0000,5/">suncalc.org</a>
        </small>
        <br>
      </label>
      <input id="culmination_greenwich" type="time" bind:value={culminationTimePrimeMeridianStr} />
  </fieldset>

  <fieldset>
      <legend>Sextant Readings</legend>

      <label for="measured_elevation">
        Measured <a href="https://www.pveducation.org/pvcdrom/properties-of-sunlight/elevation-angle">Elevation Angle</a> at <a href="https://en.wikipedia.org/wiki/Culmination">Culmination</a>
      </label>
      <AngleInput id="measured_elevation" bind:value={measuredElevation} startAngle={Angle.from_deg_min_sec(25, 9, 0)} />

      <label for="index_error">Index Error</label>
      <AngleInput id="index_error" bind:value={indexError} startAngle={Angle.from_deg_min_sec(1, 42, 0)} />
  </fieldset>
</form>

<section>
  <h2>Results</h2>

  <span>Computed <a href="https://en.wikipedia.org/wiki/Declination#Sun">Sun Declination</a></span>
  <pre>{sunDeclination.toString()}</pre>

  <span>Computed Position</span>
  <pre>{sextant.position}</pre>

  <a
      href="https://www.google.de/maps/place/{sextant.position
      .latitude},{sextant.position.longitude}"
  >
      Open on Google Maps
  </a>
</section>