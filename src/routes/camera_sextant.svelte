<script>
import { Angle } from "$lib/angle";
import { Sextant } from "$lib/sextant";
import { onMount } from "svelte";

/**
 * The meausred angle reported by the device
*/
export let measuredElevation = Angle.zero;

/**
 * Toggles the video feed visibility
*/
let showSextantCamera = false

/**
 * The video element
*/
let video = { srcObject: null }

// Read device orientation
function updateMeasuredElevation(event) {
	const measuredElevationFloat = event.beta - 90.0
	measuredElevation = new Angle(measuredElevationFloat)
}

// Show camera video feed
async function startVideo() {
	// Check if camera is available
	if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
		alert("Camera not available")
	}

	// Display camera video feed of rear facing camera
	const camera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
	video.srcObject = camera;

	window.addEventListener('deviceorientation', updateMeasuredElevation)
}

$: {
	if (showSextantCamera) {
		startVideo();
	} else {
		if (typeof window !== 'undefined') {
			window.removeEventListener('deviceorientation', updateMeasuredElevation)
		}
		video.srcObject = null;
	}
}
</script>

<button on:click={() => { showSextantCamera = !showSextantCamera; }}>
	{#if showSextantCamera}
		Stop Camera Sextant
	{:else}
		Use Camera as Sextant
	{/if}
</button>

{#if showSextantCamera}

<p>
	Point the camera directly into the sun.
	<small>Only works with Chrome.</small>
</p>

<span>{measuredElevation.toString()}</span>

<video bind:this={video} autoplay style="width: 100%;"></video>
{/if}