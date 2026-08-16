import React, { useState } from "react";

import {
  Settings,
  Building2,
  Mail,
  Wrench,
  UserPlus,
  Bell,
  ShieldCheck,
  Database,
  Clock,
  Save,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";


function SystemSettings() {

  const defaultSettings = {

    platformName:
      "Creator Analytics Platform",

    supportEmail:
      "support@creatoranalytics.com",

    maintenanceMode:
      false,

    userRegistration:
      true,

    emailNotifications:
      true,

    requireTwoFactor:
      false,

    automaticBackup:
      true,

    sessionTimeout:
      "30",

  };


  const [settings, setSettings] =
    useState(defaultSettings);

  const [saved, setSaved] =
    useState(false);


  const updateSetting =
    (key, value) => {

      setSettings((currentSettings) => ({

        ...currentSettings,

        [key]: value,

      }));

      setSaved(false);

    };


const handleSave = () => {

  setSaved(true);

  alert("System settings saved successfully!");

  setTimeout(() => {

    setSaved(false);

  }, 3000);

};

  const handleReset = () => {

    setSettings(defaultSettings);

    setSaved(false);

  };


  return (

    <div className="space-y-7">
       {/* SUCCESS MESSAGE */}

      {saved && (

        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4">

          <CheckCircle2 size={22} />

          <p className="font-semibold">

            System settings saved successfully.

          </p>

        </div>

      )}




      {/* HEADER */}

      <div>

        <p className="text-blue-600 font-semibold">

          Platform Administration

        </p>

        <h1 className="text-3xl font-bold mt-1">

          System Settings

        </h1>

        <p className="text-gray-500 mt-2">

          Configure platform settings,
          security controls and system
          preferences.

        </p>

      </div>


     
      {/* PLATFORM SETTINGS */}

      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">

            <Building2 size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              Platform Settings

            </h2>

            <p className="text-sm text-gray-500">

              Basic platform information

            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">


          <div>

            <label className="text-sm font-semibold">

              Platform Name

            </label>

            <input

              type="text"

              value={
                settings.platformName
              }

              onChange={(event) =>

                updateSetting(

                  "platformName",

                  event.target.value

                )

              }

              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          <div>

            <label className="text-sm font-semibold">

              Support Email

            </label>

            <input

              type="email"

              value={
                settings.supportEmail
              }

              onChange={(event) =>

                updateSetting(

                  "supportEmail",

                  event.target.value

                )

              }

              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


        </div>

      </div>


      {/* SYSTEM CONTROLS */}

      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">

            <Wrench size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              System Controls

            </h2>

            <p className="text-sm text-gray-500">

              Control platform availability

            </p>

          </div>

        </div>


        <div className="mt-6 space-y-5">


          <SettingToggle

            title="Maintenance Mode"

            description="Temporarily restrict platform access"

            enabled={
              settings.maintenanceMode
            }

            onChange={(value) =>

              updateSetting(

                "maintenanceMode",

                value

              )

            }

          />


          <SettingToggle

            title="Allow New User Registration"

            description="Allow new users to create accounts"

            enabled={
              settings.userRegistration
            }

            onChange={(value) =>

              updateSetting(

                "userRegistration",

                value

              )

            }

          />


          <SettingToggle

            title="Email Notifications"

            description="Send important platform notifications"

            enabled={
              settings.emailNotifications
            }

            onChange={(value) =>

              updateSetting(

                "emailNotifications",

                value

              )

            }

          />


        </div>

      </div>


      {/* SECURITY + BACKUP */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <ShieldCheck
              className="text-green-600"
              size={24}
            />

            <div>

              <h2 className="text-xl font-bold">

                Security Settings

              </h2>

              <p className="text-sm text-gray-500">

                Protect platform accounts

              </p>

            </div>

          </div>


          <div className="mt-6">

            <SettingToggle

              title="Require Two-Factor Authentication"

              description="Require additional login verification"

              enabled={
                settings.requireTwoFactor
              }

              onChange={(value) =>

                updateSetting(

                  "requireTwoFactor",

                  value

                )

              }

            />

          </div>


          <div className="mt-6">

            <label className="text-sm font-semibold">

              Session Timeout

            </label>

            <select

              value={
                settings.sessionTimeout
              }

              onChange={(event) =>

                updateSetting(

                  "sessionTimeout",

                  event.target.value

                )

              }

              className="w-full mt-2 border rounded-xl px-4 py-3 bg-white"

            >

              <option value="15">

                15 Minutes

              </option>

              <option value="30">

                30 Minutes

              </option>

              <option value="60">

                1 Hour

              </option>

              <option value="120">

                2 Hours

              </option>

            </select>

          </div>

        </div>


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Database
              className="text-purple-600"
              size={24}
            />

            <div>

              <h2 className="text-xl font-bold">

                Backup Settings

              </h2>

              <p className="text-sm text-gray-500">

                Protect platform data

              </p>

            </div>

          </div>


          <div className="mt-6">

            <SettingToggle

              title="Automatic Backup"

              description="Create a secure daily system backup"

              enabled={
                settings.automaticBackup
              }

              onChange={(value) =>

                updateSetting(

                  "automaticBackup",

                  value

                )

              }

            />

          </div>


          <div className="mt-6 bg-blue-50 rounded-xl p-4">

            <p className="font-semibold">

              Last Backup

            </p>

            <p className="text-sm text-gray-500 mt-1">

              Today at 02:30 AM

            </p>

          </div>

        </div>


      </div>


      {/* ACTION BUTTONS */}

      <div className="flex flex-col sm:flex-row justify-end gap-3">


        <button

          type="button"

          onClick={handleReset}

          className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50"

        >

          <RotateCcw size={19} />

          Reset Settings

        </button>


        <button

          type="button"

          onClick={handleSave}

          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold"

        >

          <Save size={19} />

          Save Settings

        </button>


      </div>


    </div>

  );

}


/* REUSABLE TOGGLE */

function SettingToggle({

  title,

  description,

  enabled,

  onChange,

}) {

  return (

    <div className="flex items-center justify-between gap-5">

      <div>

        <p className="font-semibold">

          {title}

        </p>

        <p className="text-sm text-gray-500 mt-1">

          {description}

        </p>

      </div>


      <button

        type="button"

        onClick={() =>

          onChange(!enabled)

        }

        className={
          `relative w-12 h-6 rounded-full transition ` +

          (
            enabled

              ? "bg-blue-700"

              : "bg-gray-300"

          )

        }

      >

        <span

          className={
            `absolute top-1 w-4 h-4 bg-white rounded-full transition ` +

            (
              enabled

                ? "left-7"

                : "left-1"

            )

          }

        />

      </button>

    </div>

  );

}


export default SystemSettings;