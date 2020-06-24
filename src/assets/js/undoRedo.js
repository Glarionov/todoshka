const EMPTY_STATE = 'emptyState';

module.exports = {
  install(Vue, options = {}) {
    if (!Vue._installedPlugins.find(plugin => plugin.Store)) {
      throw new Error("VuexUndoRedo plugin must be installed after the Vuex plugin.")
    }
    Vue.mixin({
      data() {
        return {
          done: [],
          undone: [],
          newMutation: true,
          ignoreMutations: options.ignoreMutations|| []
        };
      },
      created() {
        let notSavingMutations = [EMPTY_STATE, 'getFromLocalStoreTodoListData', 'saveCurrentlyEditingToLocalStorage'];
        if (this.$store) {
          this.$store.subscribe(mutation => {
            if (!notSavingMutations.includes(mutation.type) && this.ignoreMutations.indexOf(mutation.type) === -1) {
              this.done.push(mutation);
            }
            if (this.newMutation && mutation.type !== 'saveCurrentlyEditingToLocalStorage') {
              this.undone = [];
            }
          });
        }
      },
      computed: {
        canRedo() {
          return this.undone.length;
        },
        canUndo() {
          return this.done.length;
        }
      },
      methods: {
        redo() {
          let commit = this.undone.pop();
          this.newMutation = false;

          switch (typeof commit.payload) {
            case 'object':
              this.$store.commit(`${commit.type}`, Object.assign({}, commit.payload));
              break;
            default:
              this.$store.commit(`${commit.type}`, commit.payload);
          }
          this.newMutation = true;
          this.$forceUpdate();
        },
        undo() {
          this.undone.push(this.done.pop());
          this.newMutation = false;
          this.$store.commit(EMPTY_STATE);
          this.done.forEach(mutation => {
            switch (typeof mutation.payload) {
              case 'object':
                this.$store.commit(`${mutation.type}`, Object.assign({}, mutation.payload));
                break;
              default:
                this.$store.commit(`${mutation.type}`, mutation.payload);
            }
            this.done.pop();
          });
          this.newMutation = true;
          this.$forceUpdate();
        }
      }
    });
  },
}