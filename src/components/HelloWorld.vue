<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand href="#">Imagenes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Noticias</b-nav-item>
          <b-nav-item href="#">Categorias</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container>
      <!-- Content here -->
      <VueFileAgent
        style="margin-top:50px;"
        ref="vueFileAgent"
        :theme="'grid'"
        :multiple="true"
        :deletable="true"
        :meta="true"
        :accept="'image/*'"
        :maxSize="'10MB'"
        :maxFiles="14"
        :helpText="'Escoge imagenes'"
        :errorText="{
          type: 'Solo se aceptan imagenes',
          size: 'Files should not exceed 10MB in size',
        }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
      ></VueFileAgent>

      <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()" style="margin-top:20px;">
        Subir {{ fileRecordsForUpload.length }} archivos
      </button>

    </b-container>

  </div>
</template>

<style>
  #app {
    margin:0!important
  }
</style>

<script>
  export default {
    data: function () {
      return {
        fileRecords: [],
        uploadUrl: 'https://digitaldesing.cl/aerodomo/admin/routes/api.php',
        // uploadHeaders: { 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL' },
        fileRecordsForUpload: [],
      };
    },
    methods: {
      uploadFiles: function () {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
        this.fileRecordsForUpload = [];
      },
      deleteUploadedFile: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      },
      filesSelected: function (fileRecordsNewlySelected) {
        var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      },
      onBeforeDelete: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          if (confirm('Seguro que quieres borrar este archivo?')) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          }
        }
      },
      fileDeleted: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          this.deleteUploadedFile(fileRecord);
        }
      },
    },
  };
</script>