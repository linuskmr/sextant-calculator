<script lang="ts">
  export let timezone = "0"
</script>

<label>
  Your timezone
  <select bind:value={timezone}>
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
    <option value="0">UTC • Coordinated Universal Time</option>
    <option value="1">UTC+1 • Central European Time</option>
    <option value="2">UTC+2 • Central European Summer Time</option>
    <option value="3">UTC+3</option>
    <option value="4">UTC+4</option>
    <option value="5">UTC+5</option>
    <option value="6">UTC+6</option>
    <option value="7">UTC+7</option>
    <option value="8">UTC+8</option>
    <option value="9">UTC+9</option>
    <option value="10">UTC+10</option>
    <option value="11">UTC+11</option>
    <option value="12">UTC+12</option>
  </select>
</label>