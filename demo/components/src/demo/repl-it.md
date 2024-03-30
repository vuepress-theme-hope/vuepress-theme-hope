# Replit

## Demo

<Replit user="FuckDoctors" repl="Java-Test" :darkmode="isDarkmode" />

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" :darkmode="isDarkmode" />

<Replit user="FuckDoctors" repl="Java-Test" auto-load :darkmode="isDarkmode" />

<Replit link="https://replit.com/@FuckDoctors/Java-Test" :darkmode="isDarkmode" />

<Replit link="https://replit.com/@FuckDoctors/Java-Test#Main.java" :darkmode="isDarkmode" />

<script setup lang="ts">
import { useDarkMode } from "@vuepress/theme-default/client";

const isDarkMode = useDarkMode();
</script>
