<template>
  <div>
      <ol>
        <li
          v-for="(crumb, index) in crumbs"
          :key="index"
          property="itemListElement"
          typeof="ListItem"
          class="inline"
        >
          <NLink property="item" :to="crumb.path" class="breadcrumb-parent-link">
            <span property="name">{{ $nuxt.$route.fullPath === crumb.path && title !== null ? title : crumb.title }}</span>
          </NLink>
        </li>
      </ol>
  </div>
</template>

<script>
  import titleCase from 'ap-style-title-case'
  export default {
    props: {
      title: {
        type: String,
        default: null,
      },
    },
    computed: {
      crumbs() {
        const fullPath = this.$route.fullPath
        const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
        const crumbs = []

        let path = ''

        params.forEach((param, index) => {
          path = `${path}/${param}`
          const match = this.$router.match(path)

          if (match.name !== null) {
            crumbs.push({
              title: titleCase(param.replace(/-/g, ' ')),
              ...match,
            })
          }
        })

        if(crumbs[0].path == "/") {
          crumbs[0].title = "Dashboard"
        }

        return crumbs
      },
    },
  }
</script>

<style scoped>
  li:after {
    content: '»';
    display: inline;
    font-size: 0.9em;
    color: grey;
    padding: 0 0.0725em 0 0.15em;
    margin: 0 2px;
  }
  li:last-child:after {
    content: '';
  }
  li a.nuxt-link-exact-active.nuxt-link-active {
    color: grey !important;
  }
  .breadcrumb-parent-link {
    color: #f56565 !important;
  }
</style>
