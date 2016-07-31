'use babel'
import { loadFixture, fixturePath} from "./helpers"

describe("atom-entity-converter", () => {
  let workspaceElement = null;
  let activationPromise = null;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage("vhdl-entity-converter")
    waitsForPromise(() => {
      return atom.packages.activatePackage("language-vhdl");
    })
  })


  describe("when executing the component command inside an entity", () => {
    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open(fixturePath("entity/adder.vhd"));
      })
      runs(() => {
        atom.commands.dispatch(workspaceElement, "vhdl-entity-converter:copy-as-component")
        waitsForPromise(() => activationPromise)
      })
    })

    it("copies the component to the clipboard", () => {
      expect(atom.clipboard.read()).toBe(loadFixture("component/adder.vhd"))
    })

    it("shows a notification", () => {
      notification = atom.notifications.getNotifications()[0]
      expect(notification.type).toBe("success")
      expect(notification.message).toBe("Component for 'add' copied to the clipboard")
    })

    xit("selects the entity", () => {
      selectedText = atom.workspace.getActiveTextEditor().getSelectedText()
      expect(selectedText).toBe(loadFixture("entity/adder.vhd").trim())
    })
  })


  describe("when executing the instance command inside an entity", () => {
    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open(fixturePath("entity/adder.vhd"));
      })
      runs(() => {
        atom.commands.dispatch(workspaceElement, "vhdl-entity-converter:copy-as-instance")
        waitsForPromise(() => activationPromise)
      })
    })

    it("copies the instance to the clipboard", () => {
      expect(atom.clipboard.read()).toBe(loadFixture("instance/adder.vhd"))
    })

    it("shows a notification", () => {
      notification = atom.notifications.getNotifications()[0]
      expect(notification.type).toBe("success")
      expect(notification.message).toBe("Instance for 'add' copied to the clipboard")
    })

    xit("selects the entity", () => {
      selectedText = atom.workspace.getActiveTextEditor().getSelectedText()
      expect(selectedText).toBe(loadFixture("entity/adder.vhd").trim())
    })
  })


  describe("when executing the signas command inside an entity", () => {
    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open(fixturePath("entity/adder.vhd"));
      })
      runs(() => {
        atom.commands.dispatch(workspaceElement, "vhdl-entity-converter:copy-as-signals")
        waitsForPromise(() => activationPromise)
      })
    })

    it("copies the signals to the clipboard", () => {
      expect(atom.clipboard.read()).toBe(loadFixture("signals/adder.vhd"))
    })

    it("shows a notification", () => {
      notification = atom.notifications.getNotifications()[0]
      expect(notification.type).toBe("success")
      expect(notification.message).toBe("Signals for 'add' copied to the clipboard")
    })

    xit("selects the entity", () => {
      selectedText = atom.workspace.getActiveTextEditor().getSelectedText()
      expect(selectedText).toBe(loadFixture("entity/adder.vhd").trim())
    })
  })


  describe("when executing the component command outside an entity", () => {
    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open(fixturePath("entity/adder.vhd"));
      })
      runs(() => {
        atom.workspace.getActiveTextEditor().moveToBottom()
        atom.commands.dispatch(workspaceElement, "vhdl-entity-converter:copy-as-component")
        waitsForPromise(() => activationPromise)
      })
    })

    it("shows an error notification", () => {
      notification = atom.notifications.getNotifications()[0]
      expect(notification.type).toBe("error")
      expect(notification.message).toBe("Please move the cursor inside a VHDL entity")
    })
  })
})
