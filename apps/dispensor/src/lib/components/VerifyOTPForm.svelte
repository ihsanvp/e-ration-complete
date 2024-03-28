<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Spinner from "./Spinner.svelte";

    export let loading: boolean = false;

    let otp: number | null = null;
    $: isValid = otp?.toString().length == 6;

    const dispatch = createEventDispatcher();

    function onSubmit() {
        if (isValid) {
            dispatch("verify", otp?.toString());
        }
    }
</script>

<form class="flex flex-col w-full gap-5" on:submit|preventDefault={onSubmit}>
    <label class="flex flex-col items-center justify-center" for="phone-number">
        <span class="mb-5 text-center text-xl">Verify OTP</span>
        <input
            class="w-full h-12 border border-gray-300 overflow-hidden rounded-sm px-6 text-center tracking-[0.3em]"
            bind:value={otp}
            type="number"
            autocomplete="one-time-code"
            inputmode="numeric"
            maxlength="6"
            pattern="\d{6}"
            required
        />
    </label>
    <button
        type="submit"
        class="w-full h-12 bg-black text-white flex items-center justify-center rounded-sm"
        disabled={loading}
        class:prevent={!isValid || loading}
    >
        {#if loading}
            <Spinner size="1.5rem" color="white" width="3px" />
        {:else}
            <span>Confirm OTP</span>
        {/if}
    </button>
</form>

<style>
    .prevent {
        @apply opacity-30 pointer-events-none cursor-default;
    }
</style>
