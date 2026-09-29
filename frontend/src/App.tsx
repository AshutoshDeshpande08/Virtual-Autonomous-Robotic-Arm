import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  Environment,
} from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";


/* =========================================================
   ROBOT MATERIALS
   ========================================================= */

const BODY_COLOR = "#e4e7eb";
const JOINT_COLOR = "#f28c28";
const DARK_COLOR = "#24282d";
const ACCENT_COLOR = "#d6a84f";


/* =========================================================
   ROUNDED ROBOT LINK
   ========================================================= */

function RobotLink({
  length,
  radius = 0.22,
}: {
  length: number;
  radius?: number;
}) {
  return (
    <group>

      {/* Main rounded arm body */}
      <mesh position={[0, length / 2, 0]}>
        <capsuleGeometry
          args={[radius, Math.max(length - radius * 2, 0.05), 16, 32]}
        />

        <meshStandardMaterial
          color={BODY_COLOR}
          metalness={0.45}
          roughness={0.28}
        />
      </mesh>

      {/* Dark underside */}
      <mesh
        position={[0, length / 2, 0]}
        scale={[0.72, 0.92, 0.72]}
      >
        <capsuleGeometry
          args={[
            radius * 0.9,
            Math.max(length - radius * 2, 0.05),
            12,
            24,
          ]}
        />

        <meshStandardMaterial
          color={DARK_COLOR}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>

    </group>
  );
}


/* =========================================================
   ROBOT JOINT HOUSING
   ========================================================= */

function JointHousing({
  position,
  rotation = [0, 0, 0],
  size = 0.3,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
}) {
  return (
    <group
      position={position}
      rotation={rotation}
    >

      {/* Main joint housing */}
      <mesh>
        <sphereGeometry
          args={[size, 32, 24]}
        />

        <meshStandardMaterial
          color={BODY_COLOR}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>

      {/* Orange joint cap */}
      <mesh
        position={[0, 0, size * 0.82]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry
          args={[
            size * 0.55,
            size * 0.55,
            size * 0.18,
            32,
          ]}
        />

        <meshStandardMaterial
          color={JOINT_COLOR}
          metalness={0.65}
          roughness={0.22}
        />
      </mesh>

    </group>
  );
}


/* =========================================================
   BASE
   ========================================================= */

function RobotBase() {
  return (
    <group>

      {/* Lower base */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry
          args={[0.62, 0.72, 0.24, 48]}
        />

        <meshStandardMaterial
          color={DARK_COLOR}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Main rotating base */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry
          args={[0.48, 0.56, 0.42, 48]}
        />

        <meshStandardMaterial
          color={BODY_COLOR}
          metalness={0.5}
          roughness={0.28}
        />
      </mesh>

      {/* Orange ring */}
      <mesh position={[0, 0.64, 0]}>
        <cylinderGeometry
          args={[0.50, 0.50, 0.08, 48]}
        />

        <meshStandardMaterial
          color={JOINT_COLOR}
          metalness={0.65}
          roughness={0.22}
        />
      </mesh>

    </group>
  );
}


/* =========================================================
   END EFFECTOR
   ========================================================= */

function EndEffector() {
  return (
    <group>

      {/* Wrist housing */}
      <mesh>
        <cylinderGeometry
          args={[0.16, 0.20, 0.28, 32]}
        />

        <meshStandardMaterial
          color={DARK_COLOR}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Tool flange */}
      <mesh position={[0, -0.19, 0]}>
        <cylinderGeometry
          args={[0.12, 0.12, 0.08, 32]}
        />

        <meshStandardMaterial
          color="#b8bdc3"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* TCP */}
      <mesh position={[0, -0.30, 0]}>
        <sphereGeometry
          args={[0.065, 24, 24]}
        />

        <meshStandardMaterial
          color="#ff4b32"
          emissive="#551000"
          emissiveIntensity={1.5}
        />
      </mesh>

    </group>
  );
}


/* =========================================================
   ROBOT ARM
   ========================================================= */

function RobotArm({
  joints,
}: {
  joints: number[];
}) {

  const [
    j1,
    j2,
    j3,
    j4,
    j5,
    j6,
  ] = joints;

  return (
    <group>

      <RobotBase />

      {/* =================================================
          J1
         ================================================= */}

      <group
        rotation={[
          0,
          THREE.MathUtils.degToRad(j1),
          0,
        ]}
      >

        <mesh position={[0, 0.92, 0]}>
          <boxGeometry
            args={[0.48, 0.65, 0.48]}
          />

          <meshStandardMaterial
            color={BODY_COLOR}
            metalness={0.5}
            roughness={0.28}
          />
        </mesh>

        <JointHousing
          position={[0, 1.25, 0]}
          size={0.30}
        />

        {/* =============================================
            J2
           ============================================= */}

        <group
          position={[0, 1.25, 0]}
          rotation={[
            0,
            0,
            THREE.MathUtils.degToRad(j2),
          ]}
        >

          <RobotLink
            length={1.35}
            radius={0.24}
          />

          <JointHousing
            position={[0, 1.35, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            size={0.28}
          />

          {/* =========================================
              J3
             ========================================= */}

          <group
            position={[0, 1.35, 0]}
            rotation={[
              0,
              0,
              THREE.MathUtils.degToRad(j3),
            ]}
          >

            <RobotLink
              length={1.05}
              radius={0.21}
            />

            <JointHousing
              position={[0, 1.05, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              size={0.25}
            />

            {/* =====================================
                J4
               ===================================== */}

            <group
              position={[0, 1.05, 0]}
              rotation={[
                THREE.MathUtils.degToRad(j4),
                0,
                0,
              ]}
            >

              <RobotLink
                length={0.62}
                radius={0.18}
              />

              <JointHousing
                position={[0, 0.62, 0]}
                size={0.22}
              />

              {/* =================================
                  J5
                 ================================= */}

              <group
                position={[0, 0.62, 0]}
                rotation={[
                  0,
                  0,
                  THREE.MathUtils.degToRad(j5),
                ]}
              >

                <RobotLink
                  length={0.42}
                  radius={0.15}
                />

                <JointHousing
                  position={[0, 0.42, 0]}
                  size={0.19}
                />

                {/* =================================
                    J6
                   ================================= */}

                <group
                  position={[0, 0.42, 0]}
                  rotation={[
                    THREE.MathUtils.degToRad(j6),
                    0,
                    0,
                  ]}
                >

                  <EndEffector />

                </group>

              </group>

            </group>

          </group>

        </group>

      </group>

    </group>
  );
}


/* =========================================================
   JOINT CONTROL
   ========================================================= */

function JointControl({
  index,
  value,
  onChange,
}: {
  index: number;
  value: number;
  onChange: (
    index: number,
    value: number
  ) => void;
}) {

  const step = 1;

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "7px",
        }}
      >

        <span
          style={{
            fontWeight: "bold",
          }}
        >
          J{index + 1}
        </span>

        <span
          style={{
            color: ACCENT_COLOR,
            fontFamily: "monospace",
          }}
        >
          {value.toFixed(1)}°
        </span>

      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
        }}
      >

        {/* MINUS */}
        <button
          onClick={() =>
            onChange(
              index,
              Math.max(-180, value - step)
            )
          }
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "6px",
            border: "1px solid #3b4148",
            background: "#20242a",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          −
        </button>

        {/* SLIDER */}
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={value}
          onChange={(event) =>
            onChange(
              index,
              Number(event.target.value)
            )
          }
          style={{
            flex: 1,
          }}
        />

        {/* PLUS */}
        <button
          onClick={() =>
            onChange(
              index,
              Math.min(180, value + step)
            )
          }
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "6px",
            border: "1px solid #3b4148",
            background: "#20242a",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          +
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   MAIN APPLICATION
   ========================================================= */

function App() {

  const [
    joints,
    setJoints,
  ] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
  ]);


  const updateJoint = (
    index: number,
    value: number
  ) => {

    setJoints(
      previous =>
        previous.map(
          (joint, i) =>
            i === index
              ? value
              : joint
        )
    );
  };


  const homeRobot = () => {
    setJoints([
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
  };


  return (

    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#080a0d",
        color: "white",
        display: "flex",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      {/* =============================================
          3D VIEWPORT
         ============================================= */}

      <div
        style={{
          flex: 1,
        }}
      >

        <Canvas
          camera={{
            position: [4.5, 3.2, 5.5],
            fov: 48,
          }}
        >

          <ambientLight
            intensity={1.5}
          />

          <directionalLight
            position={[5, 8, 5]}
            intensity={3}
          />

          <directionalLight
            position={[-5, 4, -4]}
            intensity={1.5}
          />

          <Environment
            preset="city"
          />

          <RobotArm
            joints={joints}
          />

          <Grid
            infiniteGrid
            cellSize={0.5}
            sectionSize={2.5}
            fadeDistance={20}
            fadeStrength={1}
          />

          <OrbitControls />

        </Canvas>

      </div>


      {/* =============================================
          TEACH PENDANT
         ============================================= */}

      <div
        style={{
          width: "350px",
          padding: "25px",
          background: "#15181d",
          borderLeft:
            "1px solid #292d33",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >

        <h1
          style={{
            marginTop: 0,
            fontSize: "24px",
            letterSpacing: "2px",
          }}
        >
          VIRTUAL ARM
        </h1>

        <p
          style={{
            color: "#8e969f",
            fontSize: "13px",
          }}
        >
          6-AXIS ROBOTIC SIMULATOR
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >

          <div
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: "#35d07f",
              boxShadow:
                "0 0 8px #35d07f",
            }}
          />

          <span
            style={{
              color: "#35d07f",
              fontSize: "12px",
            }}
          >
            SIMULATION READY
          </span>

        </div>


        <hr
          style={{
            borderColor: "#292d33",
          }}
        />


        <h3>
          JOINT CONTROL
        </h3>


        {joints.map(
          (angle, index) => (

            <JointControl
              key={index}
              index={index}
              value={angle}
              onChange={updateJoint}
            />

          )
        )}


        <button
          onClick={homeRobot}
          style={{
            width: "100%",
            padding: "13px",
            background:
              ACCENT_COLOR,
            color: "#111",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          HOME POSITION
        </button>


        <div
          style={{
            marginTop: "22px",
            padding: "15px",
            background: "#0e1013",
            borderRadius: "7px",
          }}
        >

          <div
            style={{
              color: "#8e969f",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            JOINT STATE
          </div>

          <pre
            style={{
              color: ACCENT_COLOR,
              fontSize: "12px",
              margin: 0,
            }}
          >
            {JSON.stringify(
              joints,
              null,
              2
            )}
          </pre>

        </div>

      </div>

    </div>
  );
}

export default App;