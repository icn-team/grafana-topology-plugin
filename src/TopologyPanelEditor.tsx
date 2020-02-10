// Libraries
import React, { PureComponent, ChangeEvent } from 'react';

// Components
import { PanelOptionsGroup, Select, Switch } from '@grafana/ui';
import { PanelEditorProps, SelectableValue } from '@grafana/data';

// Types
import { TopologyOptions, TopologyMode } from './types';

export class TopologyPanelEditor extends PureComponent<PanelEditorProps<TopologyOptions>> {
  modes: Array<SelectableValue<TopologyMode>> = [{ value: 'JSON', label: 'JSON' }];

  onModeChange = (item: SelectableValue<TopologyMode>) => this.props.onOptionsChange({ ...this.props.options, mode: item.value! });

  onBackgroundChange = (evt: ChangeEvent<HTMLTextAreaElement>) =>
    this.props.onOptionsChange({ ...this.props.options, backgroundImage: (evt.target as any).value });

  onContentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onOptionsChange({ ...this.props.options, content: (evt.target as any).value });
  };

  onToggleColorGradient = () => this.props.onOptionsChange({ ...this.props.options, colorGradient: !this.props.options.colorGradient });

  render() {
    const { mode, content, backgroundImage, colorGradient } = this.props.options;

    return (
      <PanelOptionsGroup title="Text">
        <div className="gf-form-inline">
          <div className="gf-form">
            <span className="gf-form-label">Mode</span>
            <Select onChange={this.onModeChange} value={this.modes.find(e => mode === e.value)} options={this.modes} />
          </div>
          <div className="gf-form" style={{ flex: 1 }}>
            <span className="gf-form-label">Background</span>
            <textarea value={backgroundImage} onChange={this.onBackgroundChange} className="gf-form-input" rows={1} />
          </div>
        </div>
        <textarea value={content} onChange={this.onContentChange} className="gf-form-input" rows={10} />
        <Switch label="Color gradient" checked={colorGradient} onChange={this.onToggleColorGradient} />
      </PanelOptionsGroup>
    );
  }
}
