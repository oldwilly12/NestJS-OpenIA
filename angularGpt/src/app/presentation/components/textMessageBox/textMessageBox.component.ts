import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {

  @Input() placeholder: string = '';
  @Input() disableCorrection: boolean = false;

  @Output() onMessage = new EventEmitter<string>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
  });

  handleSubmit() {
     if (this.form.valid) return;

     const { prompt } = this.form.value;

     this.onMessage.emit(prompt ?? '');
     this.form.reset();
  }

}
