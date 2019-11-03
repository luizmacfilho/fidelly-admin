<template>
  <div>
    <v-tabs
      v-model="active"
      grow
    >
      <v-tab>
        Ganhar Selo
      </v-tab>

      <v-tab>
        Resgatar Recompensa
      </v-tab>

      <v-tabs-items v-model="active" touchless>
        <v-tab-item class="tab" :transition="false" :reverse-transition="false">
          <div>
            <div class="number">
              <span>(</span>
              <span class="digit">{{ getDigit(0) }}</span>
              <span class="digit">{{ getDigit(1) }}</span>
              <span>)</span>
              <span class="digit">{{ getDigit(2) }}</span>
              <span class="digit">{{ getDigit(3) }}</span>
              <span class="digit">{{ getDigit(4) }}</span>
              <span class="digit">{{ getDigit(5) }}</span>
              <span class="digit">{{ getDigit(6) }}</span>
              <span>-</span>
              <span class="digit">{{ getDigit(7) }}</span>
              <span class="digit">{{ getDigit(8) }}</span>
              <span class="digit">{{ getDigit(9) }}</span>
              <span class="digit">{{ getDigit(10) }}</span>
            </div>

            <div class="keypad">
              <div class="pad">
                <div v-ripple class="key" @click="addDigit(7)">7</div>
                <div v-ripple class="key" @click="addDigit(8)">8</div>
                <div v-ripple class="key" @click="addDigit(9)">9</div>
              </div>
              <div class="pad">
                <div v-ripple class="key" @click="addDigit(4)">4</div>
                <div v-ripple class="key" @click="addDigit(5)">5</div>
                <div v-ripple class="key" @click="addDigit(6)">6</div>
              </div>
              <div class="pad">
                <div v-ripple class="key" @click="addDigit(1)">1</div>
                <div v-ripple class="key" @click="addDigit(2)">2</div>
                <div v-ripple class="key" @click="addDigit(3)">3</div>
              </div>
              <div class="pad">
                <div v-ripple class="key zero" @click="addDigit(0)">0</div>
                <div v-ripple class="key backspace" @click="removeDigit()">
                  <v-icon>mdi-backspace</v-icon>
                </div>
              </div>
            </div>

            <v-btn block class="stamp-btn" color="primary" :disabled="number.length < 11">
              Ganhar selo
            </v-btn>
          </div>
        </v-tab-item>

        <v-tab-item :transition="false" :reverse-transition="false">
          <Auth @auth:submit="getAward($event)" :error="error" :loading="loading" label="Resgatar recompensa" block>
            <template v-slot:form>
              <v-flex sm12>
                <v-select></v-select>
              </v-flex>
            </template>
          </Auth>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Auth from '@/components/Auth.vue';

@Component({
  components: { Auth },
})
export default class Fidelly extends Vue {
  public active: number = 0;
  public number: string[] = [];
  public error: string = '';
  public loading: boolean = false;

  public created() {
    this.$store.commit('title', 'Fidelly');
  }

  public getDigit(position: number) {
    return this.number[position] || '';
  }

  public addDigit(digit: string) {
    if (this.number.length < 11) {
      this.number.push(digit);
    }
  }

  public removeDigit() {
    if (this.number.length) {
      this.number.pop();
    }
  }

  public getAward() {

  }
}
</script>

<style lang="scss" scoped>
.tab {
  text-align: center;
  display: flex;
  justify-content: center;
}

.stamp-btn {
  margin-top: 16px;
}

.number {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 16px;

  .digit {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    min-width: 20px;
    margin: 0 2px;
    border-radius: 4px;
  }
}

.keypad {
  margin-top: 16px;

  .pad {
    display: flex;
    justify-content: center;
  }

  .key {
    font-size: 30px;
    padding: 10px;
    background: gray;
    height: 60px;
    width: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 2px;
    color: white;
    display: flex;
    cursor: pointer;
    user-select: none;
  }

  .zero {
    margin-left: 65px;
  }

  .backspace i {
    color: white;
  }
}
</style>