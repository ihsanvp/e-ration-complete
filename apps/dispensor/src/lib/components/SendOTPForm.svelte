<script lang="ts">
    import Spinner from "./Spinner.svelte";
    import Icon from "@iconify/svelte";
    import flagForIndia from "@iconify/icons-emojione-v1/flag-for-india";
    import { TelInput } from "svelte-tel-input";
    import { createEventDispatcher } from "svelte";

    export let loading: boolean = false;

    let phoneNumber: string = "";
    let isValid: boolean = false;

    const dispatch = createEventDispatcher();

    function onSubmit() {
        if (isValid) {
            dispatch("send", phoneNumber);
        }
    }
</script>

<form class="flex flex-col w-full gap-5" on:submit|preventDefault={onSubmit}>
    <label class="flex flex-col items-center justify-center" for="phone-number">
        <span class="mb-5 text-center text-xl">Enter your mobile number</span>
        <div class="relative w-full">
            <div
                class="absolute left-0 top-0 right-0 w-12 border-r border-gray-300 flex items-center justify-center h-12"
            >
                <Icon icon={flagForIndia} width={20} height={20} />
            </div>
            <TelInput
                class="w-full h-12 border border-gray-300 overflow-hidden rounded-sm pl-16 tracking-[0.3em]"
                id="phone-number"
                country="IN"
                bind:value={phoneNumber}
                bind:valid={isValid}
                options={{
                    spaces: false,
                    autoPlaceholder: false,
                }}
            />
        </div>
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
            <span>Send OTP</span>
        {/if}
    </button>
</form>

<style>
    .prevent {
        @apply opacity-30 pointer-events-none cursor-default;
    }
</style>
