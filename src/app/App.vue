<template>
  <div id="app">
        <div class="body-wrapper">
            <div class="row">
                <router-link to="/home">Go to home</router-link>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

