import React from 'react';
import {Composition} from 'remotion';
import {AxiomLattice, ExtractionTheater, MnemonicTides} from './scenes';

export const Root = () => {
  return (
    <>
      <Composition id="AxiomLattice" component={AxiomLattice} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="ExtractionTheater" component={ExtractionTheater} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="MnemonicTides" component={MnemonicTides} durationInFrames={300} fps={30} width={1920} height={1080} />
    </>
  );
};
