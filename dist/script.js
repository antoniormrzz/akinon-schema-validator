const linter = new Vue({
  el: '#app',
  data: () => ({
    value: '',
    warnings: [],
    error: {},
    status: ''
  }),
  mounted: function () {
    this._editor = new CodeMirror(this.$refs.codemirror, {
      lineNumbers: true,
      tabSize: 2,
      value: this.value,
      mode: "json",
      theme: 'tomorrow-night-eighties',
      gutters: ['error']
    });

    this._editor.on('changes', () => {
      this.status = '';
      this.error = {};
      this.warnings = [];
      this.value = this._editor.getValue();

      if (this.value.trim().length > 0) {
        JSHINT(this.value);
        const errors = Array.isArray(JSHINT.errors) ? JSHINT.errors : [];
        this._editor.clearGutter('error');
        if (errors.length > 0) {
          for (const error of errors) {
            this._editor.setGutterMarker(error.line - 1, 'error', makeMarker(error.reason));
          }
          this.status = 'json syntax error, please check line ' + errors[0].line;
        } else {
          try {
            let validation = validator(JSON.parse(this.value));
            if (validation.error) {
              this.error = validation.error.getDetails();
              this.status = 'error :(';
            }
            if (validation.success) {
              this.status = 'passed! :)';
            }
            if (validation.warnings) {
              this.warnings = validation.warnings;
            }
          } catch (error) {
            this.status = 'fatal error, please contact antonio with your exact schema :)';
          }

        }
      }

    });
  }
});

function makeMarker(msg) {
  const marker = document.createElement('div');
  marker.classList.add('error-marker');
  marker.innerHTML = '&nbsp;';

  const error = document.createElement('div');
  error.innerHTML = msg;
  error.classList.add('error-message');
  marker.appendChild(error);

  return marker;
}