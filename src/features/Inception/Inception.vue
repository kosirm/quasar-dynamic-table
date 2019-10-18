<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-btn label="Click me" color="primary" @click="inception = true"/>

    <q-btn label="Unli" color="primary" @click="show('dialog0')"/>

    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Inception</div>
        </q-card-section>

        <q-card-section>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis laudantium minus earum totam modi laborum illo, corporis fuga saepe animi aliquam ea enim assumenda ut nulla natus aperiam quis. Iste.</q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Open another dialog" @click="secondDialog = true"/>
          <q-btn flat label="Close" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>

        <q-card-section>Click/Tap on the backdrop.</q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <template v-for="(dialog, index) in dialogs">
      <component
        :is="dialog"
        :parent="index"
        :key="index"
        :ref="'dialog' + index"
        @open-another="openAnother"
      />
    </template>
  </q-page>
</template>

<script>
import CustomDialog from "./CustomDialog.vue";
export default {
  components: {
    CustomDialog
  },
  data() {
    return {
      parentDialog: false,
      inception: false,
      secondDialog: false,
      dialogs: [CustomDialog]
    };
  },
  methods: {
    show(ref) {
      this.$refs[ref][0].show();      
    },
    openAnother(e) {
      this.dialogs.push(CustomDialog);
      let ref = "dialog" + (e+1);
      this.$nextTick(()=>{
        this.show(ref);
      })      
    }
  },
  mounted() {
    
  }
};
</script>