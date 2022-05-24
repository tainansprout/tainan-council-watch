<template lang="pug">
  .districtText.fw3.f6(:class="{'districtText--multiEle': !isSingleElement, 'districtText--active': isDistrictActive}")
    .districtText__square.dn.dib-ns.mr1
    .districtText__name.db.di-ns.mr2(
      @mouseover="activateArea('district', district.districtId)"
      @mouseleave="deactivateArea"
    )
      .di.f5.f6-ns {{district.districtTitle}}
      .f7.di.ml4(v-if="isQuotaVisible") {{district.districtQuota}} 席
    .db.di-ns.mt3.mt0-l
      span(v-if="isSingleElement") {{townLabelList.join('.')}}
      template(v-else)
        span.districtText__town.mr1(
          v-for="town in townLabelList"
          :key="town"
          :class="{'districtText__town--active': isTownActive(town)}"
          @mouseover="activateArea('town', town)"
          @mouseleave="deactivateArea"
        ) {{town}}
</template>
<script>
export default {
  props: {
    district: {
      type: Object,
      required: true
    },
    isSingleElement: {
      type: Boolean,
      default: false
    },
    activeArea: {
      default: null,
      validator (area) {
        return !area || (['district', 'town'].includes(area.type) && area.id)
      }
    },
    isQuotaVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localActiveArea: this.activeArea
    }
  },
  computed: {
    isDistrictActive () {
      const fa = this.activeArea
      return fa && fa.type === 'district' && fa.id === this.district.districtId
    },
    townLabelList () {
      const list = this.district.townList
      const lastTown = list[list.length - 1]
      if (!lastTown.endsWith('區')) {
        list[list.length - 1] = `${lastTown}區`
      }
      return list
    }
  },
  watch: {
    activeArea (newVal) {
      if (!newVal && !this.localActiveArea) {
        return
      }
      if (!newVal) {
        this.localActiveArea = null
      } else if (!this.localActiveArea) {
        this.localActiveArea = { ...newVal }
      } else if (newVal.type !== this.localActiveArea.type || newVal.id !== this.localActiveArea.id) {
        this.localActiveArea = { ...newVal }
      }
    }
  },
  methods: {
    isTownActive (town) {
      const fa = this.activeArea
      town = town.endsWith('區') ? town : `${town}區`
      return fa && fa.type === 'town' && fa.id === town
    },
    activateArea (type, id) {
      if (type === 'town') {
        id = id.endsWith('區') ? id : `${id}區`
      }
      this.localActiveArea = { type, id }
      this.$emit('update:activeArea', this.localActiveArea)
    },
    deactivateArea () {
      this.localActiveArea = null
      this.$emit('update:activeArea', null)
    }
  }
}
</script>
<style lang="scss" scoped>
.districtText {
  color: $black;
  text-decoration: none;

  &--multiEle {
    .districtText {
      &__name {
        text-decoration: underline;
      }
      &__town {
        text-decoration: underline;
      }
    }

  }

  &--active {
    color: $blue;
    text-decoration-color: $blue;
  }

  &__square {
    background-color: $blue;
    height: 0.625rem;
    width: 0.625rem;
  }

  &__town {
    &--active {
      color: $blue;
      text-decoration-color: $blue;
    }
  }
}
</style>
