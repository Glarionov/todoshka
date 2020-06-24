<template>
    <div class="todo-short-part-wrapper ">
        <div class="part-data-checkbox-wrapper">
            <label><input class="part-data-checkbox"
                          title="changing note status available only in editor"
                          type="checkbox" disabled :checked="partData.done"/> </label>
        </div>
        <div class="part-data-name-and-expander">
            <div class="part-data-name" ref="cartList">
                <div class="short-note-text" v-if="!showingFullVersion"
                     v-html="$options.filters.properShowNewLine(shortName)">
                </div>
                <div class="full-note-text" v-else v-html="$options.filters.properShowNewLine(partData.name)">
                </div>

            </div>
            <div class="expand-shrink-text" v-if="expandableText" @click="toggleTextExpanding">
                <span v-if="showingFullVersion">Shrink</span><span v-else>Expand</span> text
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainPageTodoNote",
        props: {
            partData: Object
        },
        data: () => {
            return {
                showingFullVersion: false,
                charactersLimitInShortShow: 60,
                lineLimit: 2,
                shortName: '',
                expandableText: false,
            }
        },
        mounted() {
            this.prepareShortName();
        },
        methods: {
            /**
             * Shrinks showing text if it has too many lines or characters
             */
            prepareShortName() {
                this.$forceUpdate();
                let partName = this.partData.name;

                let nameExplodedByLines = partName.split(/\r\n|\r|\n/);

                let lineAmount = nameExplodedByLines.length
                if (lineAmount > this.lineLimit) {
                    this.expandableText = true;
                    let shortName = '', addedLinesCounter = 0;
                    for (let nameLine of nameExplodedByLines) {
                        shortName += nameLine + '\n';
                        addedLinesCounter++;
                        if (addedLinesCounter > this.lineLimit) {
                            shortName += '…';
                            break;
                        }
                    }
                    this.shortName = shortName;
                } else {
                    if (this.partData.name.length > this.charactersLimitInShortShow) {
                        this.expandableText = true;
                        this.shortName = partName.substr(0, this.charactersLimitInShortShow) + '…';
                    } else {
                        this.shortName = partName
                    }
                }
            },
            toggleTextExpanding() {
                this.showingFullVersion = !this.showingFullVersion;
            }
        }
    }
</script>