<template>
  <div class="q-mb-xl">
    <q-table
      :grid="mode === 'grid'"
      :hide-header="mode === 'grid'"
      :data="data"
      :columns="columns"
      row-key="__index"
      :visible-columns="visibleColumns"
      :loading="innerLoading"
      :rows-per-page-options="rowOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filterOpts"
      :selection="selectionMode"
      :selected.sync="selected"
      v-bind="$attrs"
      :color="theme"
      v-on="$listeners"
    >
      <template v-slot:top="props">
        <div class="row col-12">
          <div v-if="$attrs.title" class="col-12 text-center text-h5">{{$attrs.title}}</div>
          <div v-if="$attrs.subTitle" class="col-12 text-center text-caption">{{$attrs.subTitle}}</div>
        </div>
        <div class="row col-12">
          <div class="col-12 col-md-6 row justify-start">
            <q-input
              borderless
              :color="theme"
              dense
              debounce="300"
              v-model="filterOpts"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" :color="theme"/>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 row justify-end">
            <q-toggle
              v-model="toggleSelectionMode"
              dense
              :color="theme"
              checked-icon="done_all"
              unchecked-icon="done"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{toggleSelectionMode ? 'Multiple' : 'Single'}}</q-tooltip>
            </q-toggle>
            <q-select
              v-model="visibleColumns"
              multiple
              borderless
              dense
              options-dense
              display-value="Fields"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              placeholder="Fields"
              :color="theme"
            />
            <q-select
              :color="theme"
              borderless
              dense
              v-model="separator"
              v-show="topRightOptions.cellLines && mode === 'list'"
              :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Cell', value: 'cell' },
            { label: 'None', value: 'none' }
          ]"
              emit-value
              map-options
              hide-underline
            />
            <q-btn
              flat
              :color="theme"
              round
              dense
              :icon="mode === 'grid' ? 'list' : 'grid_on'"
              @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{mode==='grid' ? 'List' : 'Grid'}}</q-tooltip>
            </q-btn>
            <q-btn
              flat
              :color="theme"
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-show="topRightOptions.fullscreenToggle"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}</q-tooltip>
            </q-btn>
          </div>
        </div>
        <!-- for actions -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            class="row col-12 justify-center q-gutter-md"
            v-if="actions && (actionsDisplayType === 'top' || actionsDisplayType === 'both') && selected.length>0"
          >
            <q-btn
              outline
              v-for="(action, i) in actions"
              :label="action"
              :key="i"
              :color="theme"
              @click="$emit(action.replace(' ', '-'), selected)"
            />
          </div>
        </transition>
      </template>
      <!-- For Grid View -->
      <template v-if="mode === 'grid'" v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card
            :class="props.selected ? 'bg-grey-2' : ''"
            @click.native="props.selected = !props.selected"
          >
            <!-- old @click.native="selected = [{ __index: props.row.__index }]; props.selected = true"
            -->
            <q-card-section class="relative-position">
              <!-- <div class="ellipsis">{{ props.cols[0].value }}</div> -->
              <q-checkbox
                v-if="toggleSelectionMode"
                dense
                :color="theme"
                v-model="props.selected"
                :label="props.cols[0].value"
              />
              <div v-if="!toggleSelectionMode" class="ellipsis">{{ props.cols[0].value }}</div>
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-pa-none">
              <q-list>
                <!-- You can check each column or item
            for another conditional rendering you like that certain column would look
            like depending on the a certain prop that column definition has.
                -->
                <template v-for="(col,i) in props.cols">
                  <q-item v-if="i > 0" :key="col.name">
                    <q-item-section>
                      <q-item-label lines="1" caption>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <template v-if="col.isRating">
                        <div class="row justify-end items-center">
                          <q-rating
                            v-model="props.row.rating"
                            size="1.5em"
                            color="green-5"
                            icon="star_border"
                            @click.stop
                          />
                        </div>
                      </template>
                      <template v-else>
                        <q-item-label lines="1" class="text-right">{{ col.value }}</q-item-label>
                      </template>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card-section>
            <!-- Shows a menu of actions passed in the table -->
            <q-menu
              touch-position
              v-if="actions && (actionsDisplayType === 'menu' || actionsDisplayType === 'both') && selected.length>0"
              context-menu
            >
              <q-list style="min-width: 100px">
                <template v-for="(action, idx) in actions">
                  <!-- included props.row beside the id to be emitted data -->
                  <q-item
                    :key="idx"
                    @click.native="$emit(action.replace(' ','-'), selected)"
                    clickable
                    v-close-popup
                  >
                    <q-item-section>{{capitalize(`${action}`)}}</q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-menu>
            <q-tooltip
              :disable="$q.platform.is.mobile && actions"
              :delay="1000"
              anchor="bottom middle"
              v-close-popup
              self="bottom middle"
              :offset="[10, 10]"
            >{{ menuToolTipMessage }}</q-tooltip>
          </q-card>
        </div>
      </template>

      <!-- For List Table View -->
      <template v-slot:body="props" v-if="mode === 'list'">
        <q-tr
          :props="props"
          @click.native="props.selected = !props.selected"
          :class="'cursor-pointer'"
        >
          <!-- @click.native="selected = [{ __index: props.row.__index }]" @click.native="props.selected = !props.selected"-->
          <q-td auto-width>
            <q-checkbox :color="theme" v-model="props.selected"/>
          </q-td>
          <!-- You can wrap your q-td's in a template here for the v-for and check each column 
            for another conditional rendering you like that certain column would look
            like depending on the a certain prop that column definition has.
          -->
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.isRating">
              <q-rating v-model="props.row.rating" size="1.5em" color="green-5" icon="star_border"/>
            </template>
            <template v-else>
              {{ col.value }}
              <q-menu
                touch-position
                v-if="actions && (actionsDisplayType === 'menu' || actionsDisplayType === 'both') && selected.length>0"
                context-menu
              >
                <!-- v-show="actions" -->
                <q-list style="min-width: 100px">
                  <template v-for="(action, idx) in actions">
                    <!-- included props.row beside the id to be emitted data -->
                    <q-item
                      :key="idx"
                      @click.native="$emit(action.replace(' ','-'), selected)"
                      clickable
                      v-close-popup
                    >
                      <q-item-section>{{capitalize(`${action}`)}}</q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-menu>
            </template>
          </q-td>
          <q-tooltip
            :disable="$q.platform.is.mobile && actions"
            :delay="1000"
            anchor="bottom middle"
            v-close-popup
            self="bottom middle"
            :offset="[10, 10]"
          >{{ menuToolTipMessage }}</q-tooltip>
        </q-tr>
      </template>
      <!-- </template> -->
    </q-table>

    <q-page-scroller position="bottom-right" :scroll-offset="400" :offset="[16, 16]" z-index="9999">
      <q-btn fab icon="keyboard_arrow_up" color="accent" z-index="9999"/>
    </q-page-scroller>

    <q-inner-loading :showing="innerLoading && mode === 'grid'">
      <q-spinner color="secondary" size="50px"/>
    </q-inner-loading>
  </div>
</template>

<script>
/**
 * @description A Custom DataTable implementation for the purpose of uniform table look and feel.
 * This has a server side functionality which calls the index function of your API
 * for Filtering results
 * @author me
 */

const capitalize = str =>
  str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export default {
  name: "dynamic-table",
  props: {
    // the table data
    data: {
      type: [Array, Object],
      default: null
    },
    // column definition
    columns: {
      type: [Array, Object],
      default: null
    },
    // actions shown when user right clicks on row or onto a table item
    // pass an array of strings pertaining to the actions that are available
    // for the current table, action name will be emitted
    // ie. if you pass :actions="['edit']" edit event will be emitted when you click on the Edit action
    actions: {
      type: [Array, Object],
      default: null
    },
    actionsDisplayType: {
      type: String,
      default: "top",
      validator: value => ["top", "menu", "both"].indexOf(value) !== -1
    },
    // color theme
    theme: {
      type: String,
      default: "primary"
    },
    // pass a false if search is disabled
    search: {
      Boolean,
      default: true
    },
    // pass this prop if you want to limit the options
    // on the table. props are shown in the default
    topRightOptions: {
      type: Object,
      default: () => {
        return {
          visibleCols: true,
          cellLines: true,
          fullscreenToggle: true
        };
      }
    },
    // current pagination settings of the table
    pagination: {
      type: Object,
      default: () => {
        return {
          rowsPerPage: 7,
          page: 1
        };
      }
    },
    dark: {
      type: Boolean,
      default: () => false
    },
    rowOptions: {
      type: Array,
      default: () => [3, 5, 7, 10, 15, 25, 50, 0]
    },
    // pass a boolean model if you want to show a loading animation
    innerLoading: {
      type: Boolean,
      default: () => false
    },
    // the filter model of your table
    searchField: {
      type: String,
      default: () => ""
    },
    selectionMode: {
      type: String,
      default: () => "none"
    }
  },
  directives: {},
  inheritAttrs: false,
  data() {
    return {
      visibleColumns: [],
      separator: "horizontal",
      selected: [],
      mode: "grid",
      paginationControl: this.pagination,
      loading: this.innerLoading,
      selection: this.selectionMode
    };
  },
  computed: {
    filterOpts: {
      set(val) {
        this.selected = [];
        this.$emit("search-change", val);
      },
      get() {
        return this.searchField;
      }
    },
    selectionComputedMode() {
      return this.mode === "grid"
        ? this.selectionMode === "none"
          ? "single"
          : this.selectionMode
        : this.selectionMode !== "none"
        ? this.selectionMode
        : "none";
    },
    toggleSelectionMode: {
      set(val) {
        this.selected = [];
        this.$emit("selection-mode-change", val);
      },
      get() {
        return this.selectionMode === "multiple";
      }
    },
    menuToolTipMessage() {
      return `${
        this.actionsDisplayType === "menu" || this.actionsDisplayType === "both"
          ? "Right/Left click"
          : "Click"
      } to see actions`;
    }
  },
  methods: {
    capitalize,
    notify(notif) {
      this.$q.notify({
        type: "negative",
        message: "Not allowed to delete."
      });
    }
  },
  watch: {
    selectionMode(val) {
      console.log("changed", val);
    },
    selected() {
      console.log("selected changed", this.selected);
    },
    pagination: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("hanlder", newVal, oldVal);
      }
    },
    data(v) {
      console.log("dynamic-table", this.data);
    }
  },
  mounted() {
    this.visibleColumns = this.columns.map(v => {
      if (v.hideonload) {
        return;
      }
      return v.name;
    });
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
};
</script>

<style>
.grid-style-transition {
  transition: transform 0.3s;
}
</style>
