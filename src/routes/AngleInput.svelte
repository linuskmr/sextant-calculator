<script>
	import { Angle } from "$lib/angle";

	export let id = "";

	let degrees = 0;
	let minutes = 0;
	let seconds = 0;

	export let value = Angle.zero;
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
  