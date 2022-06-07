<template lang="pug">
  nuxt-link.orgTag.flex.items-center.justify-between.mw-100.pointer(
    :to="to"
    :class="{'orgTag--plain': plainText}"
  )
    .orgTag__label.underline.ls2.truncate {{stats.name}} {{stats.count}}
    b-tooltip.flex-none(
      v-if="!plainText && brief"
      :label="brief"
      type="is-white"
      :square="true"
      :multilined="true"
      :triggers="['focus', 'hover']"
    )
      button.plainButton.flex.items-center(tabindex="-1")
        tcw-icon.orgTag__info(icon="info-black")
        tcw-icon.orgTag__info.orgTag__info--hover(icon="info-blue")
</template>
<script>
import BRIEF_LIST from '~/content/meta/departmentBrief.json'

const BRIEF_MAP = BRIEF_LIST.departmentBrief.reduce((accu, org) => {
  accu[org.abbr] = org.brief
  return accu
}, {})

export default {
  props: {
    stats: {
      type: Object,
      required: true
    },
    plainText: {
      type: Boolean,
      default: false
    },
    to: {
      type: [Object, String],
      default: ''
    }
  },
  computed: {
    brief () {
      return BRIEF_MAP[this.stats.name]
    }
  }
}
</script>
<style lang="scss" scoped>
.orgTag {
  border: 1px solid #D8D8D8;
  border-top: 4px solid #49B0D5;
  height: 3.5rem;
  padding: 0 1.25rem;
  min-width: 0;

  &--plain {
    border: none;
    height: auto;
    padding: 0;
    text-decoration: underline;
  }

  &__info {
    display: block;
    font-size: 1.25rem;
    &--hover {
      display: none;
    }
  }

  &:hover {
    color: $blue;
    font-weight: 400;
    .orgTag__info {
      display: none;
      &--hover {
        display: block;
      }
    }
  }

  ::v-deep {
    .tooltip-content {
      text-align: left;
    }
  }
}
</style>
