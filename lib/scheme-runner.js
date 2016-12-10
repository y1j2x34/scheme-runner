'use babel';

import SchemeRunnerView from './scheme-runner-view';
import { CompositeDisposable } from 'atom';

export default {

  schemeRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.schemeRunnerView = new SchemeRunnerView(state.schemeRunnerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.schemeRunnerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'scheme-runner:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.schemeRunnerView.destroy();
  },

  serialize() {
    return {
      schemeRunnerViewState: this.schemeRunnerView.serialize()
    };
  },

  toggle() {
    console.log('SchemeRunner was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
