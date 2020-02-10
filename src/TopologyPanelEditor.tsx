// Libraries
import React, { PureComponent, ChangeEvent } from 'react';

// Components
import { PanelOptionsGroup, Select, Switch } from '@grafana/ui';
import { PanelEditorProps, SelectableValue } from '@grafana/data';

// Types
import { TopologyOptions, TopologyMode, Size, Font, Position } from './types';

export class TopologyPanelEditor extends PureComponent<PanelEditorProps<TopologyOptions>> {
  modes: Array<SelectableValue<TopologyMode>> = [{ value: 'JSON', label: 'JSON' }];
  sizes: Array<SelectableValue<Size>> = [
    { value: 28, label: 'Small' },
    { value: 30, label: 'Medium' },
    { value: 32, label: 'Large' },
  ];
  fonts: Array<SelectableValue<Font>> = [{ value: 'Verdana', label: 'Verdana' }];
  positions: Array<SelectableValue<Position>> = [
    { value: 'Top', label: 'Top' },
    { value: 'Bottom', label: 'Bottom' },
    { value: 'Left', label: 'Left' },
    { value: 'Right', label: 'Right' },
  ];

  onModeChange = (item: SelectableValue<TopologyMode>) => this.props.onOptionsChange({ ...this.props.options, mode: item.value! });

  onBackgroundChange = (evt: ChangeEvent<HTMLTextAreaElement>) =>
    this.props.onOptionsChange({ ...this.props.options, backgroundImage: (evt.target as any).value });

  onContentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onOptionsChange({ ...this.props.options, content: (evt.target as any).value });
  };

  onToggleColorGradient = () => this.props.onOptionsChange({ ...this.props.options, colorGradient: !this.props.options.colorGradient });

  onLabelSizeChange = (item: SelectableValue<Size>) => this.props.onOptionsChange({ ...this.props.options, labelSize: item.value! });

  onLabelFontChange = (item: SelectableValue<Font>) => this.props.onOptionsChange({ ...this.props.options, labelFont: item.value! });

  onLabelPositionChange = (item: SelectableValue<Position>) => this.props.onOptionsChange({ ...this.props.options, labelPosition: item.value! });

  render() {
    const { mode, content, backgroundImage, colorGradient, labelSize, labelFont, labelPosition } = this.props.options;

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

        <div className="gf-form">
          <span className="gf-form-label">Label Size</span>
          <Select onChange={this.onLabelSizeChange} value={this.sizes.find(e => labelSize === e.value)} options={this.sizes} />
          <span className="gf-form-label">Label Font</span>
          <Select onChange={this.onLabelFontChange} value={this.fonts.find(e => labelFont === e.value)} options={this.fonts} />
          <span className="gf-form-label">Label Position</span>
          <Select onChange={this.onLabelPositionChange} value={this.positions.find(e => labelPosition === e.value)} options={this.positions} />
        </div>

        <Switch label="Color gradient" checked={colorGradient} onChange={this.onToggleColorGradient} />
      </PanelOptionsGroup>
    );
  }
}
