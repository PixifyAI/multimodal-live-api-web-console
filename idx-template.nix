{ pkgs, ... }: {
  packages = [];
  bootstrap = ''
    mkdir "$out"
    cp -rf ${./.}/* "$out"
    mkdir "$out/.idx"
    cp -rf ${./.}/.idx "$out"
    cp -rf ${./.}/.gcloudignore "$out/.gcloudignore"
    cp -rf ${./.}/.env "$out/.env"
    rm "$out/idx-template.nix"
    rm "$out/idx-template.json"
    chmod -R u+w "$out"
  '';
}