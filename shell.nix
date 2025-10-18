{ pkgs ? import <nixpkgs> {} }:
(pkgs.buildFHSEnv {
  name = "whiteboard";
  targetPkgs = pkgs: (with pkgs; [
    docker
    python313
    python313Packages.pip
    python313Packages.virtualenv
    nodejs_24
  ]);

  runScript = "zsh";
}).env
