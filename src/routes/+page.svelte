<script lang="ts">
  import { Sextant } from "../lib/sextant";
  import { Angle } from "../lib/angle";
  import {
    sunDeclination as calculateSunDeclination,
    dayOfYear,
  } from "$lib/sun_declination";
  import Footer from "./Footer.svelte";
  import AngleInput from "./AngleInput.svelte";

  let timezoneStr = "0"; // Default to UTC/GMT timezone
  $: timezone = Number.parseFloat(timezoneStr);

  // Measured angle
  let measuredAngle = Angle.zero;

  // Index error
  let indexError = Angle.zero;

  // Measuring date and time
  let datetimeStr = new Date(Date.UTC(2022, /*February*/1, 12, 12, 30)).toISOString().substring(0, 16)

  // Parse measuring datetimeStr to Date object
  let datetime: Date = new Date();
  $: {
    datetime = new Date(datetimeStr);
  }

  // Get the sun declination for the given date
  $: sunDeclination = calculateSunDeclination(dayOfYear(datetime));

  // Calculate the sextant position
  $: sextant = new Sextant(datetime, measuredAngle, sunDeclination, indexError);
</script>

<h1>Sextant Calculator</h1>

<h2>Inputs</h2>
<form>
  <fieldset>
      <legend>Time</legend>

      <!-- <label for="date">
          Measuring Date<br>
          <input id="date" type="date" bind:value={dateStr} />
      </label> -->

      <label for="datetime">Date & Time</label>
      <input type="datetime-local" id="datetime" bind:value={datetimeStr} />

      <label for="timezone">Timezone</label>

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
  </fieldset>

  <fieldset>
      <legend>Sextant Readings</legend>

      <label for="measured_angle">Measured Angle at Sun Peak</label>
      <AngleInput id="measured_angle" bind:value={measuredAngle} />

      <label for="index_error">Index Error</label>
      <AngleInput id="index_error" bind:value={indexError} />
  </fieldset>
</form>

<section>
  <h2>Results</h2>

  <span>Computed Sun Declination</span>
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