/*
 * Copyright (c) 2020 Cisco and/or its affiliates.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 // Libraries
import React, { PureComponent, ChangeEvent } from 'react';

// Components
import { PanelOptionsGroup, Select, Switch, ColorPicker } from '@grafana/ui';
import { PanelEditorProps, SelectableValue } from '@grafana/data';

// Types
import { TopologyOptions, TopologyMode, Size, Font, Position, Color } from './types';

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

  colors: Array<SelectableValue<Color>> = [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
  ];

  onModeChange = (item: SelectableValue<TopologyMode>) => this.props.onOptionsChange({ ...this.props.options, mode: item.value! });

  onBackgroundChange = (evt: ChangeEvent<HTMLTextAreaElement>) =>
    this.props.onOptionsChange({ ...this.props.options, backgroundImage: (evt.target as any).value });

  onContentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onOptionsChange({ ...this.props.options, content: (evt.target as any).value });
  };

  onToggleColorGradient = () => this.props.onOptionsChange({ ...this.props.options, colorGradient: !this.props.options.colorGradient });

  onColorChanged = (color: string) => this.props.onOptionsChange({ ...this.props.options, color: color });

  onLabelSizeChange = (item: SelectableValue<Size>) => this.props.onOptionsChange({ ...this.props.options, labelSize: item.value! });

  onLabelFontChange = (item: SelectableValue<Font>) => this.props.onOptionsChange({ ...this.props.options, labelFont: item.value! });

  onLabelPositionChange = (item: SelectableValue<Position>) => this.props.onOptionsChange({ ...this.props.options, labelPosition: item.value! });

  onLabelColorChange = (item: SelectableValue<Color>) => this.props.onOptionsChange({ ...this.props.options, labelColor: item.value! });

  render() {
    const { mode, content, backgroundImage, colorGradient, color, labelSize, labelFont, labelPosition, labelColor } = this.props.options;

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
          <span className="gf-form-label">Label Color</span>
          <Select onChange={this.onLabelColorChange} value={this.colors.find(e => labelColor === e.value)} options={this.colors} />
        </div>

        <div className="gf-form">
          <Switch label="Color gradient" checked={colorGradient} onChange={this.onToggleColorGradient} />
          <span className="gf-form-label">Color:</span>
          <div className="thresholds-row-input-inner-color-colorpicker">
            <div className="gf-form-input">
              <ColorPicker color={color} onChange={this.onColorChanged}></ColorPicker>
            </div>
          </div>
        </div>
      </PanelOptionsGroup>
    );
  }
}
