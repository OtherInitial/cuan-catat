@extends('template')
@section('content')
<script>
    $(document).ready(function(){
        $("#id2").hide();
        $("#grafik").click(function(){
            $("#id1").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id2").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close").click(function(){
            $("#id1").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id2").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id3").hide();
        $("#grafik1").click(function(){
            $("#id1").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id3").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close1").click(function(){
            $("#id1").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id3").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id5").hide();
        $("#grafik2").click(function(){
            $("#id4").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id5").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close2").click(function(){
            $("#id4").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id5").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id6").hide();
        $("#grafik3").click(function(){
            $("#id4").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id6").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close3").click(function(){
            $("#id4").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id6").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id8").hide();
        $("#grafik4").click(function(){
            $("#id7").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id8").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close4").click(function(){
            $("#id7").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id8").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id9").hide();
        $("#grafik5").click(function(){
            $("#id7").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id9").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close5").click(function(){
            $("#id7").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id9").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id11").hide();
        $("#grafik6").click(function(){
            $("#id10").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id11").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close6").click(function(){
            $("#id10").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id11").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#id12").hide();
        $("#grafik7").click(function(){
            $("#id10").hide(); // Menampilkan/menyembunyikan elemen pertama
            $("#id12").show(); // Menampilkan/menyembunyikan elemen kedua
        });
        $("#close7").click(function(){
            $("#id10").show(); // Menampilkan/menyembunyikan elemen pertama
            $("#id12").hide(); // Menampilkan/menyembunyikan elemen kedua
        });
    });
</script>
    <style>
        /* Gaya khusus jika diperlukan */
        .custom-container {
            display: flex;
            align-items: center;
            justify-content: center;
            /* Mengisi tinggi layar sepenuhnya */
        }
        .card {
            transition: transform 0.5s;
        }

        .card:hover {
            transform: scale(1.05);
        }
        .custom-card {
            width: 100%;
            /* Atur lebar maksimum card */
            text-align: center;
            /* Pusatkan teks di dalam card */
            margin-top: 20px;
            /* Berikan sedikit ruang di atas card */
            transition: transform 0.5s;
            
        }
        
        .custom-card:hover {
            transform: scale(1.05);
        }

        @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

        * {
            box-sizing: border-box;
        }

        .counter-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }

        .counter {
            font-size: 40px;
            margin-top: 10px;
        }

        @media (max-width: 580px) {
            body {
                flex-direction: column;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
        crossorigin="anonymous" />
    {{-- <script src="path-to-gauge-library.js"></script> --}}
    <div class="container" style="background:#e2e7ff">
        <div class="row">
            <!-- Card 1 (Atas Kiri) -->
            <div class="col-md-6">
                <div class="card custom-card">
                    <div id="id1" class="card-body">
                        <h2 class="card-title text-center fw-bold" style="color:black">SOLAR PANEL 1</h2>
                        <p style="font-size: 15px; font-weight:normal; align-items:center; text-align:center">
                            <span id="lastUpdated"></span>
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"
                            viewBox="0 0 640 512" fill="gold"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                            <path
                                d="M122.2 0C91.7 0 65.5 21.5 59.5 51.4L8.3 307.4C.4 347 30.6 384 71 384H288v64H224c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V384H569c40.4 0 70.7-36.9 62.8-76.6l-51.2-256C574.5 21.5 548.3 0 517.8 0H122.2zM260.9 64H379.1l10.4 104h-139L260.9 64zM202.3 168H101.4L122.2 64h90.4L202.3 168zM91.8 216H197.5L187.1 320H71L91.8 216zm153.9 0H394.3l10.4 104-169.4 0 10.4-104zm196.8 0H548.2L569 320h-116L442.5 216zm96-48H437.7L427.3 64h90.4l31.4-6.3L517.8 64l20.8 104z" />
                        </svg><br><br>
                        <script>
                            // Function to format timestamp to human-readable date and time
                            function formatTimestamp(timestamp) {
                                const date = new Date(timestamp);
                                return date.toLocaleString(); // You can customize the format as needed
                            }

                            // Fetch last update time
                            fetch("/api/data-pv1-spirit")
                                    .then((res) => res.json())
                                    .then(result => {
                                        // Display last update time
                                        document.getElementById("lastUpdated").innerText = "Last Update: " + formatTimestamp(result.data
                                            .waktu_rtc);
                                    });
                        </script>
                        <div class="row">
                            <div class="col-md-6">
                                <!-- Konten Bagian Kiri Card 1 -->
                                <h5 class="card-title text-center fw-bold" style="color:red; font-size:20px"> <svg
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                    </svg>VOLTAGE
                                </h5>
                                <div class="counter-container">
                                    <div class="counter text-center " style="color:black" id="vol_pv1_counter"
                                        data-target=""></div>
                                    <span>Volt</span>
                                    <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-7 d-flex justify-content-start align-items-center" style="padding-bottom: 20px; margin-left:5px">
                                    <!-- Tombol untuk membuka pop-up -->
                                    <a href="#" class="btn btn-primary me-2" onclick="openPopup()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                    </a>
                            
                                <!-- Pop-up -->
                                <div id="popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px;">
                                        <form id="dateForm">
                                            <div class="mb-3">
                                                <label for="startDate" class="form-label">Start Date</label>
                                                <input type="date" class="form-control" id="startDate" name="startDate">
                                            </div>
                                            <div class="mb-3">
                                                <label for="endDate" class="form-label">End Date</label>
                                                <input type="date" class="form-control" id="endDate" name="endDate">
                                            </div>
                                            <button type="submit" class="btn btn-primary" onclick="updateChart7()">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            
                                <script>
                                    // Fungsi untuk membuka pop-up
                                    function openPopup() {
                                        document.getElementById('popup').style.display = 'block';
                                    }
                            
                                    // Menggunakan jQuery untuk menangani submit form
                                    $(document).ready(function() {
                                        $('#dateForm').submit(function(event) {
                                            event.preventDefault();
                                            var startDate = $('#startDate').val();
                                            var endDate = $('#endDate').val();
                                            // Simpan tanggal dalam session
                                            sessionStorage.setItem('startDate', startDate);
                                            sessionStorage.setItem('endDate', endDate);
                                            // Redirect ke halaman chart
                                            window.location.href = "/monitoring";
                                        });
                                    });
                                </script>

                                    <a href="#" id="grafik" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- Konten Bagian Kanan Card 1 -->
                                <h5 class="card-title text-center fw-bold" style="color:dodgerblue; font-size:20px"><svg
                                        xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                        viewBox="0 0 512 512" fill="dodgerblue"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                        <path
                                            d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg> CURRENT</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="current_pv1_counter"
                                        data-target=""></div>
                                    <span>Ampere</span>
                                    <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-5 d-flex align-items-center" style="padding-bottom: 20px; margin-left:20px">
                                    <a href="#" id="grafik1" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="id2" style="" class="text-center">
                        <h1 class="pt-5" id="currentDate"></h1>
                        <div class="chartstyle pb-5">
                          <canvas id="lightchart" width="406" height="0" ></canvas>
                          <div class="lighterrore" >@include('chartvol1')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng1" type="button">Export as PNG</button>
                        <button id="close" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                      <div id="id3" style="" class="text-center">
                        <div class="chartstyle py-5">
                          <div class="lighterrore" >@include('chartRealtime1')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng2" type="button">Export as PNG</button>
                        <button id="close1" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                      <br>
                </div>
            </div>

            <!-- Card 2 (Atas Kanan) -->
            <div class="col-md-6">
                <div class="card custom-card">
                    <div id="id4" class="card-body">
                        <h2 class="card-title text-center fw-bold" style="color:black">SOLAR PANEL 2</h2>
                        <p style="font-size: 15px; font-weight:normal; align-items:center; text-align:center">
                            <span id="lastUpdated11"></span>
                        </p><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"
                            viewBox="0 0 640 512" fill="gold"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                            <path
                                d="M122.2 0C91.7 0 65.5 21.5 59.5 51.4L8.3 307.4C.4 347 30.6 384 71 384H288v64H224c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V384H569c40.4 0 70.7-36.9 62.8-76.6l-51.2-256C574.5 21.5 548.3 0 517.8 0H122.2zM260.9 64H379.1l10.4 104h-139L260.9 64zM202.3 168H101.4L122.2 64h90.4L202.3 168zM91.8 216H197.5L187.1 320H71L91.8 216zm153.9 0H394.3l10.4 104-169.4 0 10.4-104zm196.8 0H548.2L569 320h-116L442.5 216zm96-48H437.7L427.3 64h90.4l31.4-6.3L517.8 64l20.8 104z" />
                        </svg><br><br>
                        <script>
                            // Function to format timestamp to human-readable date and time
                            function formatTimestamp(timestamp) {
                                const date = new Date(timestamp);
                                return date.toLocaleString(); // You can customize the format as needed
                            }

                            // Fetch last update time
                            fetch("/api/data-pv2-spirit")
                                .then((res) => res.json())
                                .then(result => {
                                    // Display last update time
                                    document.getElementById("lastUpdated11").innerText = "Last Update: " + formatTimestamp(result.data
                                        .waktu_rtc);
                                });
                        </script>
                        <div class="row">
                            <div class="col-md-6">
                                <!-- Konten Bagian Kiri Card 2 -->
                                <h5 class="card-title text-center fw-bold" style="color:red; font-size:20px"> <svg
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                    </svg>VOLTAGE</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="vol_pv2_counter"
                                        data-target=""></div>
                                    <span>Volt</span>
                                    <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-7 d-flex justify-content-start align-items-center" style="padding-bottom: 20px">
                                    <a href="#" class="btn btn-primary me-2" onclick="openPopup4()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                    </a>
                            
                                <!-- Pop-up -->
                                <div id="popup4" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px;">
                                        <form id="dateForm4">
                                            <div class="mb-3">
                                                <label for="startDate4" class="form-label">Start Date</label>
                                                <input type="date" class="form-control" id="startDate4" name="startDate4">
                                            </div>
                                            <div class="mb-3">
                                                <label for="endDate4" class="form-label">End Date</label>
                                                <input type="date" class="form-control" id="endDate4" name="endDate4">
                                            </div>
                                            <button type="submit" class="btn btn-primary" onclick="updateChart8()">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            
                                <script>
                                    // Fungsi untuk membuka pop-up
                                    function openPopup4() {
                                        document.getElementById('popup4').style.display = 'block';
                                    }
                            
                                    // Menggunakan jQuery untuk menangani submit form
                                    $('#dateForm4').submit(function(event) {
                                    event.preventDefault();
                                    var startDate4 = $('#startDate4').val();
                                    var endDate4 = $('#endDate4').val();
                                    sessionStorage.setItem('startDate4', startDate4);
                                    sessionStorage.setItem('endDate4', endDate4);
                                    window.location.href = "/monitoring";
                                });
                            </script>
                                    <a href="#" id="grafik2" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- Konten Bagian Kanan Card 2 -->
                                <h5 class="card-title text-center fw-bold" style="color:dodgerblue; font-size:20px"><svg
                                        xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                        viewBox="0 0 512 512" fill="dodgerblue"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                        <path
                                            d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg> CURRENT</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="current_pv2_counter"
                                        data-target=""></div>
                                    <span>Ampere</span>
                                    <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-5 d-flex justify-content-start align-items-center" style="padding-bottom: 20px; margin-left:30px">
                                    <a href="#" id="grafik3" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="id5" style="" class="text-center">
                    <h1 class="pt-5" id="currentDate2"></h1>
                    <div class="chartstyle pb-5">
                          <canvas id="lightchart" width="406" height="0" ></canvas>
                          <div class="lighterrore" >@include('chartvol2')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng7" type="button">Export as PNG</button>
                        <button id="close2" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                      <div id="id6" style="" class="text-center">
                        <div class="chartstyle py-5">
                          <div class="lighterrore" >@include('chartRealtime2')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng8" type="button">Export as PNG</button>
                        <button id="close3" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                      <br>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <!-- Card 3 (Bawah Kiri) -->
            <div class="col-md-6">
                <div class="card custom-card">
                    <div id="id7" class="card-body">
                        <h2 class="card-title text-center fw-bold" style="color:black">BATTERY</h2>
                        <p style="font-size: 15px; font-weight:normal; align-items:center; text-align:center">
                            <span id="lastUpdated1"></span>
                        </p><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"
                            viewBox="0 0 576 512" fill="maroon"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                            <path
                                d="M464 160c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16H464zM80 96C35.8 96 0 131.8 0 176V336c0 44.2 35.8 80 80 80H464c44.2 0 80-35.8 80-80V320c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32V176c0-44.2-35.8-80-80-80H80zm272 96H96V320H352V192z" />
                        </svg><br><br>
                        <script>
                            // Function to format timestamp to human-readable date and time
                            function formatTimestamp(timestamp) {
                                const date = new Date(timestamp);
                                return date.toLocaleString(); // You can customize the format as needed
                            }

                            // Fetch last update time
                            fetch("/api/data-battery-spirit")
                                .then((res) => res.json())
                                .then(result => {
                                    // Display last update time
                                    document.getElementById("lastUpdated1").innerText = "Last Update: " + formatTimestamp(result.data
                                        .waktu_rtc);
                                });
                        </script>
                        <div class="row">
                            <div class="col-md-6">
                                <!-- Konten Bagian Kiri Card 2 -->
                                <h5 class="card-title text-center fw-bold" style="color:red; font-size:20px"> <svg
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                    </svg>VOLTAGE</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="vol_bat_counter"
                                        data-target=""></div>
                                    <span>Volt</span>
                        <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-7 d-flex justify-content-start align-items-center" style="padding-bottom: 20px; margin-left:5px">
                                    <a href="#" class="btn btn-primary me-2" onclick="openPopup2()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                    </a>
                            
                                <!-- Pop-up -->
                                <div id="popup2" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px;">
                                        <form id="dateForm2">
                                            <div class="mb-3">
                                                <label for="startDate2" class="form-label">Start Date</label>
                                                <input type="date" class="form-control" id="startDate2" name="startDate2">
                                            </div>
                                            <div class="mb-3">
                                                <label for="endDate2" class="form-label">End Date</label>
                                                <input type="date" class="form-control" id="endDate2" name="endDate2">
                                            </div>
                                            <button type="submit" class="btn btn-primary" onclick="updateChart9()">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            
                                <script>
                                    // Fungsi untuk membuka pop-up
                                    function openPopup2() {
                                        document.getElementById('popup2').style.display = 'block';
                                    }
                            
                                    // Menggunakan jQuery untuk menangani submit form
                                    $('#dateForm2').submit(function(event) {
                                    event.preventDefault();
                                    var startDate2 = $('#startDate2').val();
                                    var endDate2 = $('#endDate2').val();
                                    sessionStorage.setItem('startDate2', startDate2);
                                    sessionStorage.setItem('endDate2', endDate2);
                                    window.location.href = "/monitoring";
                                });
                                </script>
                                    <a href="#" id="grafik4" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- Konten Bagian Kanan Card 2 -->
                                <h5 class="card-title text-center fw-bold" style="color:dodgerblue; font-size:20px"><svg
                                        xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                        viewBox="0 0 512 512" fill="dodgerblue"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                        <path
                                            d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg> CURRENT</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="current_bat_counter"
                                        data-target=""></div>
                                    <span>Ampere</span>
                        <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                    <div class="col-5 d-flex justify-content-start align-items-center" style="padding-bottom: 20px; margin-left:20px">
                                    <a href="#" id="grafik5" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="id8" style="" class="text-center">
                    <h1 class="pt-5" id="currentDate3"></h1>
                    <div class="chartstyle pb-5">
                          <canvas id="lightchart" width="406" height="0" ></canvas>
                          <div class="lighterrore" >@include('chartvol3')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng3" type="button">Export as PNG</button>
                        <button id="close4" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                      <div id="id9" style="" class="text-center">
                        <div class="chartstyle py-5">
                          <div class="lighterrore" >@include('chartRealtime3')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng4" type="button">Export as PNG</button>
                        <button id="close5" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                </div>
            </div>

            <!-- Card 4 (Bawah Kanan) -->
            <div class="col-md-6">
                <div class="card custom-card" style="text-align: center;">
                    <div id="id10" class="card-body">
                        <h2 class="card-title text-center fw-bold" style="color:black">PUMP/LOAD</h2>
                        <p style="font-size: 15px; font-weight:normal; align-items:center; text-align:center">
                            <span id="lastUpdated2"></span>
                        </p><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"
                            viewBox="0 0 576 512" fill="limegreen"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                            <path
                                d="M112 0C85.5 0 64 21.5 64 48V256H48c-26.5 0-48 21.5-48 48v96c0 8 2 15.6 5.4 22.2c3.8-1.7 7.8-3.1 12-4.1c13.1-3.1 26.7-9.8 37.3-18.6c22.2-18.7 54.3-20.1 78.1-3.4c18 12.4 40.1 20.3 59.2 20.3c21.1 0 42-8.5 59.2-20.3c22.1-15.5 51.6-15.5 73.7 0c18.4 12.7 39.6 20.3 59.2 20.3c19 0 41.2-7.9 59.2-20.3c23.8-16.7 55.8-15.3 78.1 3.4c10.6 8.8 24.2 15.6 37.3 18.6c4.2 1 8.2 2.4 12 4.1C574 415.6 576 408 576 400V304c0-26.5-21.5-48-48-48H480l0-146.7 25.4 25.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-80-80c-12.5-12.5-32.8-12.5-45.3 0l-80 80c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 109.3 416 256H288V48c0-26.5-21.5-48-48-48H112zM306.5 421.9c-11.1-7.9-25.9-7.9-37 0C247 437.4 219.5 448 192 448c-26.9 0-55.3-10.8-77.4-26.1l0 0c-11.9-8.5-28.1-7.8-39.2 1.7c-14.4 11.9-32.5 21-50.6 25.2c-17.2 4-27.9 21.2-23.9 38.4s21.2 27.9 38.4 23.9c24.5-5.7 44.9-16.5 58.2-25C126.5 501.7 159 512 192 512c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.5 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.4-27.3-10.1-39.2-1.7l0 0C439.4 437.2 410.9 448 384 448c-27.5 0-55-10.6-77.5-26.1z" />
                        </svg><br><br>
                        <script>
                            // Function to format timestamp to human-readable date and time
                            function formatTimestamp(timestamp) {
                                const date = new Date(timestamp);
                                return date.toLocaleString(); // You can customize the format as needed
                            }

                            // Fetch last update time
                            fetch("/api/data-pump-spirit")
                                .then((res) => res.json())
                                .then(result => {
                                    // Display last update time
                                    document.getElementById("lastUpdated2").innerText = "Last Update: " + formatTimestamp(result.data
                                        .waktu_rtc);
                                });
                        </script>
                        <div class="row">
                            <div class="col-md-6">
                                <!-- Konten Bagian Kiri Card 3 -->
                                <h5 class="card-title text-center fw-bold" style="color:red; font-size:20px"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                    </svg>VOLTAGE</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="vol_pump_counter"
                                        data-target=""></div>
                                    <span>Volt</span>
                                    <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-7 d-flex justify-content-start align-items-center" style="padding-bottom: 20px">
                                    <a href="#" class="btn btn-primary me-2" onclick="openPopup3()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                    </a>
                            
                                <!-- Pop-up -->
                                <div id="popup3" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px;">
                                        <form id="dateForm3">
                                            <div class="mb-3">
                                                <label for="startDate3" class="form-label">Start Date</label>
                                                <input type="date" class="form-control" id="startDate3" name="startDate3">
                                            </div>
                                            <div class="mb-3">
                                                <label for="endDate3" class="form-label">End Date</label>
                                                <input type="date" class="form-control" id="endDate3" name="endDate3">
                                            </div>
                                            <button type="submit" class="btn btn-primary" onclick="updateChart10()">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            
                                <script>
                                    // Fungsi untuk membuka pop-up
                                    function openPopup3() {
                                        document.getElementById('popup3').style.display = 'block';
                                    }
                            
                                    // Menggunakan jQuery untuk menangani submit form
                                    $('#dateForm3').submit(function(event) {
                                    event.preventDefault();
                                    var startDate3 = $('#startDate3').val();
                                    var endDate3 = $('#endDate3').val();
                                    sessionStorage.setItem('startDate3', startDate3);
                                    sessionStorage.setItem('endDate3', endDate3);
                                    window.location.href = "/monitoring";
                                });
                            </script>
                                    <a href="#" id="grafik6" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- Konten Bagian Kanan Card 3 -->
                                <h5 class="card-title text-center fw-bold" style="color:dodgerblue; font-size:20px"> <svg
                                        xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                        viewBox="0 0 512 512" fill="dodgerblue"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                        <path
                                            d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg> CURRENT</h5>
                                <div class="counter-container">
                                    <div class="counter text-center" style="color:black" id="current_pump_counter"
                                        data-target=""></div>
                                    <span>Ampere</span>
                                    <div id="lighticon"
                            class="text-center text-muted justify-content-center align-items-center pt-2"
                            style="font-size: 20px;">
                            <div class="row justify-content-center">
                                <div class="col-5 d-flex justify-content-start align-items-center" style="padding-bottom: 20px; margin-left:30px">
                                    <a href="#" id="grafik7" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-graph-up"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="id11" style="" class="text-center">
                    <h1 class="pt-5" id="currentDate4"></h1>
                    <div class="chartstyle pb-5">
                          <canvas id="lightchart" width="406" height="0" ></canvas>
                          <div class="lighterrore" >@include('chartvol4')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng7" type="button">Export as PNG</button>
                        <button id="close6" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                      <div id="id12" style="" class="text-center">
                        <div class="chartstyle py-5">
                          <div class="lighterrore" >@include('chartRealtime4')</div>
                        </div>
                        <button class="btn bg-success text-white" id="lightpng8" type="button">Export as PNG</button>
                        <button id="close7" class="btn bg-success text-white lighttutupc">Close</button>
                        <style>
                            element.style {
                            }
                            .text-center {
                                text-align: center !important;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            user agent stylesheet
                            div {
                                display: block;
                            }
                            .card {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                word-wrap: break-word;
                                background-color: #fff;
                                background-clip: border-box;
                                border: 1px solid rgba(0, 0, 0, .05);
                                border-radius: 0.375rem;
                            }
                            body {
                                margin: 0;
                                font-family: Open Sans, sans-serif;
                                font-size: 1rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #525f7f;
                                text-align: left;
                                background-color: rgb(255, 255, 255);
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-classic: "Font Awesome 6 Free";
                                --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
                            }
                            <style>
                            :host, :root {
                                --fa-style-family-brands: "Font Awesome 6 Brands";
                                --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
                            }
                            :root {
                                --blue: #5e72e4;
                                --indigo: #5603ad;
                                --purple: #8965e0;
                                --pink: #f3a4b5;
                                --red: #f5365c;
                                --orange: #fb6340;
                                --yellow: #ffd600;
                                --green: #2dce89;
                                --teal: #11cdef;
                                --cyan: #2bffc6;
                                --white: #fff;
                                --gray: #8898aa;
                                --gray-dark: #32325d;
                                --light: #ced4da;
                                --lighter: #e9ecef;
                                --primary: #5e72e4;
                                --secondary: #f7fafc;
                                --success: #2dce89;
                                --info: #11cdef;
                                --warning: #fb6340;
                                --danger: #f5365c;
                                --light: #adb5bd;
                                --dark: #212529;
                                --default: #172b4d;
                                --white: #fff;
                                --neutral: #fff;
                                --darker: #000;
                                --breakpoint-xs: 0;
                                --breakpoint-sm: 576px;
                                --breakpoint-md: 768px;
                                --breakpoint-lg: 992px;
                                --breakpoint-xl: 1200px;
                                --font-family-sans-serif: Open Sans, sans-serif;
                                --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                            }
                            html {
                                font-family: sans-serif;
                                line-height: 1.15;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                                -ms-overflow-style: scrollbar;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                            *, *:after, *:before {
                                box-sizing: border-box;
                            }
                        </style>
                      </div>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <script>
        // Function to update the gauge from API
        function updateGaugeFromAPI() {
            fetch("/api/data-pv1-spirit/")
                .then((res) => res.json())
                .then(result => {
                    const vol_pv1 = result.data.vol_pv1;
                    const current_pv1 = result.data.current_pv1;

                    updateCounter('vol_pv1_counter', vol_pv1);
                    updateCounter('current_pv1_counter', current_pv1);

                    // Log the values to the console
                    console.log('vol_pv1:', vol_pv1);
                    console.log('current_pv1:', current_pv1);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Update the gauge every 5 seconds (adjust as needed)
        setInterval(updateGaugeFromAPI, 30000);

        // Initial update when the page loads
        updateGaugeFromAPI();


        function updateCounter(counterId, target) {
            const counter = document.getElementById(counterId);
            counter.setAttribute('data-target', target);
            counter.innerText = '0';
            const updateCounter = () => {
                const current = +counter.innerText;
                const increment = target / 100;
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }

        // Panggil fetchCounterData saat halaman dimuat
        fetchCounterData();
    </script>

    <script>
        // Function to update the gauge from API
        function updateGaugeFromAPI() {
            fetch("/api/data-pv2-spirit/")
                .then((res) => res.json())
                .then(result => {
                    const vol_pv2 = result.data.vol_pv2;
                    const current_pv2 = result.data.current_pv2;

                    updateCounter('vol_pv2_counter', vol_pv2);
                    updateCounter('current_pv2_counter', current_pv2);

                    console.log('vol_pv2:', vol_pv2);
                    console.log('current_pv2:', current_pv2);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Update the gauge every 5 seconds (adjust as needed)
        setInterval(updateGaugeFromAPI, 30000);

        // Initial update when the page loads
        updateGaugeFromAPI();


        function updateCounter(counterId, target) {
            const counter = document.getElementById(counterId);
            counter.setAttribute('data-target', target);
            counter.innerText = '0';
            const updateCounter = () => {
                const current = +counter.innerText;
                const increment = target / 100;
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }

        // Panggil fetchCounterData saat halaman dimuat
        fetchCounterData();
    </script>

    <script>
        // Function to update the gauge from API
        function updateGaugeFromAPI() {
            fetch("/api/data-battery-spirit/")
                .then((res) => res.json())
                .then(result => {
                    const vol_bat = result.data.vol_bat;
                    const current_bat = result.data.current_bat;

                    updateCounter('vol_bat_counter', vol_bat);
                    updateCounter('current_bat_counter', current_bat);

                    console.log('vol_bat:', vol_bat);
                    console.log('current_bat:', current_bat);

                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Update the gauge every 5 seconds (adjust as needed)
        setInterval(updateGaugeFromAPI, 30000);

        // Initial update when the page loads
        updateGaugeFromAPI();


        function updateCounter(counterId, target) {
            const counter = document.getElementById(counterId);
            counter.setAttribute('data-target', target);
            counter.innerText = '0';
            const updateCounter = () => {
                const current = +counter.innerText;
                const increment = target / 100;
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }

        // Panggil fetchCounterData saat halaman dimuat
        fetchCounterData();
    </script>

    <script>
        // Function to update the gauge from API
        function updateGaugeFromAPI() {
            fetch("/api/data-pump-spirit/")
                .then((res) => res.json())
                .then(result => {
                    const vol_pump = result.data.vol_pump;
                    const current_pump = result.data.current_pump;

                    updateCounter('vol_pump_counter', vol_pump);
                    updateCounter('current_pump_counter', current_pump);

                    // Log the values to the console
                    console.log('vol_pump:', vol_pump);
                    console.log('current_pump:', current_pump);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Update the gauge every 5 seconds (adjust as needed)
        setInterval(updateGaugeFromAPI, 30000);

        // Initial update when the page loads
        updateGaugeFromAPI();


        function updateCounter(counterId, target) {
            const counter = document.getElementById(counterId);
            counter.setAttribute('data-target', target);
            counter.innerText = '0';
            const updateCounter = () => {
                const current = +counter.innerText;
                const increment = target / 100;
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }

        // Panggil fetchCounterData saat halaman dimuat
        fetchCounterData();
    </script>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

    </div>
    <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>
    <!-- Drag Target Area To SlideIn Menu On Small Screens -->
    <div class="drag-target"></div>
    </div>
    <!-- / Layout wrapper -->
    <!--/ Layout Content -->
    </section>
    <!-- Include Scripts -->
    <!-- BEGIN: Vendor JS-->
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/jquery/jquery.js?id=c9eab148c98f81221c99ba6da84fdbe2">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/popper/popper.js?id=3b2f93fa0eb2f0ed310a789319de72fc">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/js/bootstrap.js?id=f4406bcd0acdeffbdcca24c2e1033ae6">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js?id=2f948c841c6aca9e3a18f6ef2c65b140">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/js/menu.js?id=3421096250c82e0d3760f641a4d2dba0">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/apex-charts/apexcharts.js">
    </script>
    <!-- END: Page Vendor JS-->
    <!-- BEGIN: Theme JS-->
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/js/main.js?id=0c91cceb5195b308a36d5ac021b16464">
    </script>

    <!-- END: Theme JS-->
    <!-- Pricing Modal JS-->
    <!-- END: Pricing Modal JS-->
    <!-- BEGIN: Page JS-->
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/js/dashboards-analytics.js">
    </script>
    <!-- END: Page JS-->




    <svg id="SvgjsSvg1283" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev"
        style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;">
        <defs id="SvgjsDefs1284"></defs>
        <polyline id="SvgjsPolyline1285" points="0,0"></polyline>
        <path id="SvgjsPath1286"
            d="M-1 217.1625L-1 217.1625C-1 217.1625 61.09071568080357 217.1625 61.09071568080357 217.1625C61.09071568080357 217.1625 122.18143136160714 217.1625 122.18143136160714 217.1625C122.18143136160714 217.1625 183.27214704241072 217.1625 183.27214704241072 217.1625C183.27214704241072 217.1625 244.36286272321428 217.1625 244.36286272321428 217.1625C244.36286272321428 217.1625 305.45357840401783 217.1625 305.45357840401783 217.1625C305.45357840401783 217.1625 366.54429408482144 217.1625 366.54429408482144 217.1625C366.54429408482144 217.1625 427.635009765625 217.1625 427.635009765625 217.1625C427.635009765625 217.1625 427.635009765625 217.1625 427.635009765625 217.1625 ">
        </path>
    </svg>
    </body>

    </html>
@endsection
