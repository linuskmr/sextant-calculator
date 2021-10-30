<script lang="ts">
    import DomMeasurement from "./Measurement.svelte";
    import {Measurement, MeasurementType} from "./lib/measurement";
    import {Angle} from "./lib/angle";

    let measurements = [];

  /**
   * Adds one measurement to the end of the measurement array.
   */
  function addMeasurement() {
      measurements = [...measurements, {
          type: "sunrise",
          time: "",
          angle: "10° 51'"
      }];
  }

  /**
   * Deletes a measurement from the measurements array at index i.
   */
  function deleteMeasurement(i: number): Function {
      return () => {
          measurements.splice(i, 1)
          // Needed for svelte's reactivity?!
          measurements = measurements
      }
  }
</script>

<button on:click={addMeasurement}>Add Measurement</button>

<ul>
  {#each measurements as measurement, i}
    <li>
      <DomMeasurement {...measurement} />
      <button on:click={deleteMeasurement(i)} style="margin: 0">×</button>
    </li>
  {/each}
</ul>

<button on:click={() => console.log(measurements)}>Show data</button>

<style>
  ul {
      list-style-type: none;
      padding-left: 0;
  }

  li {
      border-bottom: 1px solid var(--secondary-color);
      padding-bottom: 20px;
      margin-bottom: 20px;
  }
</style>