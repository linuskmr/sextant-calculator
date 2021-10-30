<script lang="ts">
  // https://stackoverflow.com/a/14246394
  export let date = new Date().toISOString().substring(0, 10)
</script>

<label>
  Measuring Date
  <br>
  <input type="date" bind:value={date}>
</label>