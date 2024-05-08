# Replit

## Demo

<Replit user="FuckDoctors" repl="Java-Test" :darkmode="isDarkMode" />

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" :darkmode="isDarkMode" />

<Replit user="FuckDoctors" repl="Java-Test" click-to-load :darkmode="isDarkMode" />

<Replit link="https://replit.com/@FuckDoctors/Java-Test" :darkmode="isDarkMode" />

<Replit link="https://replit.com/@FuckDoctors/Java-Test#Main.java" :darkmode="isDarkMode" />

<script setup lang="ts">
import { useDarkMode } from "@vuepress/theme-default/client";

const isDarkMode = useDarkMode();
</script>
