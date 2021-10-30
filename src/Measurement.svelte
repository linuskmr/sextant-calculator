<script lang="ts">
    import {Measurement, MeasurementType} from "./lib/measurement";
    import {Angle} from "./lib/angle";

    export let type: string
    export let time: string
    export let angle: string
</script>

<label>
    Type
    <select bind:value={type}>
        <option value="measurement">Measurement</option>
        <option value="sunpeak">Sun peak</option>
        <option value="sunset">Sunset</option>
        <option value="sunrise">Sunrise</option>
    </select>
</label>

<label>
    Time
    <input bind:value={time} type="time" placeholder="12:00" style="max-width: 100px">
</label>

<label>
    Angle
    <input bind:value={angle} type="text" placeholder="26° 41'" size=15>
</label>
