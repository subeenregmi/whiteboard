{
  description = "whiteboard";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";
  };

  outputs = { nixpkgs, ... }: 
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      stdenv = pkgs.stdenv;
      lib = pkgs.lib;
    in {
      devShells.${system}.default = pkgs.mkShell{
        name = "whiteboard";

        NIX_LD_LIBRARY_PATH = lib.makeLibraryPath [
          stdenv.cc.cc
        ];

        NIX_LD = lib.fileContents "${stdenv.cc}/nix-support/dynamic-linker";

        packages = with pkgs; [
          docker
          python313
          poetry
          nodejs_24
          zsh
        ];

        shellHook = ''
          export LD_LIBRARY_PATH=$NIX_LD_LIBRARY_PATH
          zsh
        '';
      };
    };
}
