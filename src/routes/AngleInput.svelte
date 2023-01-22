<script lang="ts">
	import { Angle } from "$lib/angle";

	export let id = "";
	export let startAngle = Angle.zero;

	let degrees = startAngle.degrees;
	let minutes = startAngle.minutes;
	let seconds = startAngle.seconds;

	export let value: Angle;
	$: value = Angle.from_deg_min_sec(degrees, minutes, seconds);
</script>

<input
	id={id}
	type="number"
	bind:value={degrees}
/>°
<input
	type="number"
	bind:value={minutes}
/>'
<input
	type="number"
	bind:value={seconds}
/>"

<style>
	input[type=number] {
		width: 50px;
	}
</style>
  