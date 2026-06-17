Hooks.on("getSceneControlButtons", (controls) => {
    controls["media-viewer"] = {
        name: "media-viewer",
        title: "Media Viewer",
        icon: "fas fa-image",
        tools: {
            "show-image": {
                name: "show-image",
                title: "Show Image",
                icon: "fas fa-image",
                button: true,
                onChange: openMediaViewer
            }
        }
    };
});

async function openMediaViewer() {
    const url = await foundry.applications.api.DialogV2.prompt({
        window: { title: "Media Viewer" },
        content: `
            <div style="padding: 4px 0">
                <label for="mv-url">Choose a url</label>
                <input id="mv-url" name="url" type="url" style="width:100%;margin-top:4px"
                       placeholder="https://..." autofocus>
            </div>`,
        ok: {
            label: "Confirm",
            callback: (event, button) => button.form.elements.url.value.trim()
        }
    });
    if (!url) return;
    showImagePopout(url);
}

function showImagePopout(src) {
    const popout = new foundry.applications.apps.ImagePopout({
        src,
        window: { title: "Media Viewer" }
    });
    popout.render(true);
}
